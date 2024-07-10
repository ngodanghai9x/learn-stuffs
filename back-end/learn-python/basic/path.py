import os 
dir_path = os.path.dirname(os.path.realpath(__file__))
print("🐍 File: basic/path.py | Line: 3 | undefined ~ __file__",__file__)
print("🐍 File: basic/path.py | Line: 3 | undefined ~ os.path.realpath(__file__)",os.path.realpath(__file__))
print("🐍 File: basic/path.py | Line: 3 | undefined ~ dir_path",dir_path)

cwd = os.getcwd()
print("🐍 File: basic/path.py | Line: 5 | undefined ~ cwd",cwd)

path_join = os.path.join(cwd, str('file.txt'))
print("🐍 File: basic/path.py | Line: 11 | undefined ~ path_join",path_join)