import json

def analyze_elementor_json(filepath):
    try:
        with open(filepath, 'r') as f:
            json_string = f.read()
        data = json.loads(json_string)
        is_valid_json = True
    except FileNotFoundError:
        return f"Error: File not found at {filepath}", False, False
    except json.JSONDecodeError as e:
        return f"Invalid JSON: {e}", False, False
    except Exception as e:
        return f"An unexpected error occurred: {e}", False, False

    elementor_keys = ['version', 'title', 'type', 'content']
    is_elementor_template = all(key in data for key in elementor_keys)

    return "Valid JSON.", is_valid_json, is_elementor_template

if __name__ == '__main__':
    file_path = 'user_data.json'  # Path to the JSON file
    message, is_valid, is_elementor = analyze_elementor_json(file_path)

    print(f"JSON validation: {message}")
    if is_valid:
        print(f"Is Elementor template: {is_elementor}")
