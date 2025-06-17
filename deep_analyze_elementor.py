import json
import re

# Domains to ignore for hardcoded URL checks (common CDNs and generic services)
IGNORED_DOMAINS = [
    "connect.facebook.net",
    "www.facebook.com",
    "cdnjs.cloudflare.com",
    "www.youtube.com",
    "vimeo.com",
    "www.dailymotion.com",
    "fonts.googleapis.com",
    "use.fontawesome.com",
    # Add more generic domains if needed
]

# Common placeholders to look for
PLACEHOLDERS_PATTERNS = [
    r"\[MECANISMO.*?\]",
    r"\[OBJEÇÃO.*?\]",
    r"IDDOPRODUTO",
    r"SEUNUMERO",
    r"NOME DA SUA EMPRESA",
    r"Lorem Ipsum",
    # Placeholder image names
    r"placeholder\.png",
    r"placeholder-\d+\.png",
    # Specific bonus placeholders like X, Y, Z, W, F, P, Q, R, S, T
    # These are often single uppercase letters in contexts like "BÔNUS 1: X"
    # To avoid false positives, we'll look for them in specific contexts if possible,
    # or accept that single letters might be part of legitimate text.
    # For now, we'll list specific examples found in the JSON.
    r"Curso em vídeo de X", # Example, will be more generic later
    r"Curso em vídeo de Y",
    r"Lista de Z",
    r"Checklist W",
    r"Aulas extras sobre F",
    r"BÔNUS \d: [A-Z](?=[<\s])", # Matches "BÔNUS 1: X" where X is a single letter followed by a space or tag end
]

# Fields that might contain URLs
URL_FIELDS = [
    "url", "background_image", "youtube_url", "vimeo_url",
    "dailymotion_url", "link", "image", "bg_image", # bg_image might be custom
    "src" # for images/scripts in HTML
]

# Fields that might contain text with placeholders or HTML content
TEXT_FIELDS = [
    "html", "editor", "title", "text", "button_text", "heading",
    "label_days", "label_hours", "label_minutes", "label_seconds",
    "sub_heading", "period", "item_text", "footer_additional_info", "ribbon_title",
    "tab_title", "tab_content", "before_text", "highlighted_text", "rotating_text",
    # any field that can accept user-editable string
]

hardcoded_urls_found = set()
placeholders_found = set()
html_widget_scripts = {
    "facebook_pixel_generic_id": False,
    "toastr_js_configured": False,
    "toastr_product_name_empty": False,
    "f12_right_click_disabled": False,
    "utm_eduzz_scripts": False,
}

def analyze_value(key_name, value, element_id=None, widget_type=None):
    """Recursively analyzes a value for URLs, placeholders, and HTML content."""
    if isinstance(value, dict):
        for k, v in value.items():
            analyze_value(k, v, element_id, widget_type)
    elif isinstance(value, list):
        for item in value:
            analyze_value(key_name, item, element_id, widget_type)
    elif isinstance(value, str):
        # 1. Hardcoded URLs
        if key_name in URL_FIELDS or (isinstance(key_name, str) and "url" in key_name.lower()) or "href" in value.lower():
            # More robust URL finding
            urls = re.findall(r'https?://[^\s"\']+', value)
            for url in urls:
                domain = re.search(r"https?://([^/]+)", url)
                if domain and domain.group(1) not in IGNORED_DOMAINS:
                    hardcoded_urls_found.add(url)

        # Check for URLs in image settings (often nested)
        if key_name == "image" and isinstance(value, dict) and "url" in value:
             url = value["url"]
             domain = re.search(r"https?://([^/]+)", url)
             if domain and domain.group(1) not in IGNORED_DOMAINS:
                hardcoded_urls_found.add(url)
        if key_name == "background_image" and isinstance(value, dict) and "url" in value:
             url = value["url"]
             if url: # Ensure URL is not empty
                domain = re.search(r"https?://([^/]+)", url)
                if domain and domain.group(1) not in IGNORED_DOMAINS:
                    hardcoded_urls_found.add(url)
        if key_name == "link" and isinstance(value, dict) and "url" in value:
            url = value["url"]
            if url and not url.startswith("#"): # Ignore anchor links
                domain = re.search(r"https?://([^/]+)", url)
                if domain and domain.group(1) not in IGNORED_DOMAINS:
                    hardcoded_urls_found.add(url)


        # 2. Placeholders
        if key_name in TEXT_FIELDS or "text" in str(key_name).lower() or "title" in str(key_name).lower() or "html" in str(key_name).lower() or "editor" in str(key_name).lower() :
            for pattern in PLACEHOLDERS_PATTERNS:
                matches = re.findall(pattern, value, re.IGNORECASE)
                for match in matches:
                    placeholders_found.add(match)
            # Specific check for placeholder images in text/html fields
            if "placeholder.png" in value or "placeholder-1.png" in value or "placeholder-2.png" in value or "placeholder-3.png" in value or "placeholder-6.png" in value:
                 placeholders_found.add(f"Placeholder image mentioned in text: {value[:100]}...")


        # 3. HTML Widget Content Analysis
        if widget_type == "html" and key_name == "html":
            if "fbq('init', '0000000000000')" in value:
                html_widget_scripts["facebook_pixel_generic_id"] = True
            if "toastr.js" in value and "var product_name = \"\"" in value:
                html_widget_scripts["toastr_js_configured"] = True
                html_widget_scripts["toastr_product_name_empty"] = True
            elif "toastr.js" in value: # if configured but product_name might not be empty
                html_widget_scripts["toastr_js_configured"] = True
            if "e.keyCode == 123" in value and "e.preventDefault()" in value and "contextmenu" in value:
                html_widget_scripts["f12_right_click_disabled"] = True
            if "chk.eduzz.com" in value and "sun.eduzz.com" in value and "utmParamQueryString" in value:
                html_widget_scripts["utm_eduzz_scripts"] = True


def analyze_elementor_data(data):
    if isinstance(data, dict):
        element_id = data.get("id")
        widget_type = data.get("widgetType")
        for key, value in data.items():
            if key == "elements" and isinstance(value, list):
                for element in value:
                    analyze_elementor_data(element) # Recursively analyze elements
            # Analyze settings of the current element
            elif key == "settings" and isinstance(value, dict):
                 for setting_key, setting_value in value.items():
                    analyze_value(setting_key, setting_value, element_id, widget_type)
            # Analyze other top-level keys if necessary (though most data is in elements and settings)
            else:
                 analyze_value(key, value, element_id, widget_type)

    elif isinstance(data, list):
        for item in data:
            analyze_elementor_data(item)


if __name__ == "__main__":
    filepath = 'user_data.json'
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            elementor_content = json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found at {filepath}")
        exit()
    except json.JSONDecodeError as e:
        print(f"Invalid JSON in file: {e}")
        exit()

    # Start analysis from the 'content' array usually
    if 'content' in elementor_content and isinstance(elementor_content['content'], list):
        analyze_elementor_data(elementor_content['content'])
    else: # Or analyze the whole structure if 'content' isn't the top-level entry for elements
        analyze_elementor_data(elementor_content)


    print("--- Analysis Report ---")

    print("\n[1] Hardcoded Domain-Specific URLs Found:")
    if hardcoded_urls_found:
        for url in sorted(list(hardcoded_urls_found)):
            print(f"- {url}")
    else:
        print("No domain-specific hardcoded URLs found (excluding common CDNs).")

    print("\n[2] Placeholders Found:")
    if placeholders_found:
        # Further refine placeholder list by removing generic HTML snippets if any got caught
        # This is a simple filter, could be improved
        filtered_placeholders = {p for p in placeholders_found if not p.startswith("<")}
        for placeholder in sorted(list(filtered_placeholders)):
            print(f"- {placeholder}")
    else:
        print("No common placeholders found.")

    print("\n[3] HTML Widget Content Analysis:")
    print(f"- Facebook Pixel with generic ID ('0000000000000'): {html_widget_scripts['facebook_pixel_generic_id']}")
    print(f"- Toastr.js notification script configured: {html_widget_scripts['toastr_js_configured']}")
    if html_widget_scripts['toastr_js_configured']:
        print(f"  - Toastr.js 'product_name' is empty: {html_widget_scripts['toastr_product_name_empty']}")
    print(f"- F12/Right-click disabling script present: {html_widget_scripts['f12_right_click_disabled']}")
    print(f"- UTM parameter script for Eduzz links present: {html_widget_scripts['utm_eduzz_scripts']}")

    print("\n--- End of Report ---")
