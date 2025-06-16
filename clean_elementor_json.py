import json
import os

# Specific image filenames to look for and replace their full URLs with basenames
IMAGE_FILENAMES_TO_BASENAME = [
    "placeholder.png", "placeholder-1.png", "placeholder-2.png", "placeholder-3.png", "placeholder-6.png",
    "AnyConv.com__Design-sem-nome.webp",
    "GARANTIA-24-1024x864-1.png",
    "S-COLUNA-DE-IMG-BONUS-pzxcwcltm13omjifucac7m9d7q3ez8yyh0thd2o0sg.webp", # Both occurrences
    "fitness-with-music.jpg",
    "Design-sem-nome-10.png",
    "53e5314f-189e-4e83-9fbf-c1bfd84b6404.webp",
    "DALL·E-2023-11-02-22.19.webp", # Note the special character, ensure encoding is handled.
    "streching-on-river-side.jpg"
]

# Domains whose image URLs should be checked for basenaming
TARGET_IMAGE_DOMAINS = [
    "souoceanoazul.com.br",
    "tuannybacelarnutri.com.br",
    "absolution.site"
]

def clean_url(url_string):
    """Replaces full image URL with its basename if it matches target domains and filenames."""
    if not isinstance(url_string, str):
        return url_string
    try:
        for domain in TARGET_IMAGE_DOMAINS:
            if domain in url_string:
                filename = os.path.basename(url_string.split('?')[0]) # Get filename before query params
                if filename in IMAGE_FILENAMES_TO_BASENAME:
                    return filename
    except Exception:
        pass # Ignore errors if URL parsing fails for some reason
    return url_string

def clean_settings(settings):
    """Cleans URLs and HTML content within an element's settings."""
    if not isinstance(settings, dict):
        return settings

    cleaned_settings = {}
    for key, value in settings.items():
        if isinstance(value, str):
            # Image URL cleaning (direct string value)
            if key == "url" and any(fn in value for fn in IMAGE_FILENAMES_TO_BASENAME): # A bit broad, refine if needed
                 cleaned_settings[key] = clean_url(value)
            # Eduzz Product URL
            elif key == "url" and value == "https://sun.eduzz.com/IDDOPRODUTO":
                cleaned_settings[key] = "https://sun.eduzz.com/YOUR_PRODUCT_ID"
            # WhatsApp URL
            elif key == "url" and "https://api.whatsapp.com/send?phone=SEUNUMERO" in value:
                cleaned_settings[key] = value.replace("phone=SEUNUMERO", "phone=YOUR_WHATSAPP_NUMBER")
            # Facebook Pixel ID in HTML
            elif key == "html" and "fbq('init', '0000000000000')" in value:
                temp_html = value.replace("fbq('init', '0000000000000');", "fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');")
                cleaned_settings[key] = temp_html.replace(
                    "src=\"https://www.facebook.com/tr?id=0000000000000&ev=PageView&noscript=1\"",
                    "src=\"https://www.facebook.com/tr?id=YOUR_FACEBOOK_PIXEL_ID&ev=PageView&noscript=1\""
                )
            # Toastr Product Name in HTML
            elif key == "html" and 'var product_name = "";' in value:
                cleaned_settings[key] = value.replace('var product_name = "";', 'var product_name = "YOUR_PRODUCT_NAME";')
            else:
                cleaned_settings[key] = value
        elif isinstance(value, dict):
            # Image URLs in nested structures like 'background_image', 'image', 'link'
            if key in ["background_image", "background_image_mobile", "image"]:
                if "url" in value:
                    value["url"] = clean_url(value["url"])
            elif key == "link":
                if "url" in value:
                    if value["url"] == "https://sun.eduzz.com/IDDOPRODUTO":
                        value["url"] = "https://sun.eduzz.com/YOUR_PRODUCT_ID"
                    elif "https://api.whatsapp.com/send?phone=SEUNUMERO" in value["url"]:
                        value["url"] = value["url"].replace("phone=SEUNUMERO", "phone=YOUR_WHATSAPP_NUMBER")
            cleaned_settings[key] = clean_settings(value) # Recurse for nested dicts
        elif isinstance(value, list):
            # Image URLs in lists (e.g., image carousels)
            if key == "carousel": # Specific for image-carousel widget
                cleaned_list = []
                for item in value:
                    if isinstance(item, dict) and "url" in item:
                        item["url"] = clean_url(item["url"])
                    cleaned_list.append(item)
                cleaned_settings[key] = cleaned_list
            else:
                cleaned_settings[key] = [clean_settings(item) if isinstance(item, dict) else item for item in value]
        else:
            cleaned_settings[key] = value

    return cleaned_settings

def clean_elementor_data(data):
    """Recursively traverses and cleans Elementor JSON data."""
    if isinstance(data, list):
        return [clean_elementor_data(item) for item in data]
    elif isinstance(data, dict):
        cleaned_dict = {}
        for key, value in data.items():
            if key == "settings":
                cleaned_dict[key] = clean_settings(value)
            elif key == "elements" and isinstance(value, list):
                cleaned_dict[key] = clean_elementor_data(value)
            else:
                # For other keys, check if their values might need cleaning directly
                # This handles cases where URLs or specific strings might be outside 'settings'
                if isinstance(value, str):
                    temp_value = clean_url(value)
                    if temp_value == "https://sun.eduzz.com/IDDOPRODUTO":
                         temp_value = "https://sun.eduzz.com/YOUR_PRODUCT_ID"
                    elif "https://api.whatsapp.com/send?phone=SEUNUMERO" in temp_value:
                         temp_value = temp_value.replace("phone=SEUNUMERO", "phone=YOUR_WHATSAPP_NUMBER")
                    cleaned_dict[key] = temp_value
                elif isinstance(value, dict):
                    cleaned_dict[key] = clean_elementor_data(value) # Recurse for nested dicts
                elif isinstance(value, list):
                     cleaned_dict[key] = clean_elementor_data(value) # Recurse for nested lists
                else:
                    cleaned_dict[key] = value
        return cleaned_dict
    else:
        return data

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

    cleaned_content = clean_elementor_data(elementor_content)

    # Output the cleaned JSON
    print(json.dumps(cleaned_content, ensure_ascii=False, indent=2))
