def confirm_json_format(json_correct_format: list, **kwargs) -> None:
    json_format = list(kwargs.keys())

    if sorted(json_correct_format) != sorted(json_format):
        raise KeyError({"Error": "Incorrect requisition format.", "Valid_keys": json_correct_format, "Received_keys": json_format})

def confirm_existing_keys(json_correct_format: list, **kwargs) -> None:
    json_format = list(kwargs.keys())

    for element in json_format:
        if not element in json_correct_format:
            raise KeyError({"Error": "Incorrect requisition format.", "Valid_keys": json_correct_format, "Received_keys": json_format})
