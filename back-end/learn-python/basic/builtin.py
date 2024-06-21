import builtins


def getattrV2Private(obj, field_name, default=None):
    # print(type(obj))
    if (isinstance(obj, dict)):
        return obj.get(field_name, default)
    return getattr(obj, field_name, default)


builtins.getattrV2 = getattrV2Private

x = {
    "a": 2
}

print(x.get('a'))
print(getattrV2(x, 'a'))
print(getattrV2(x, 'b'))
