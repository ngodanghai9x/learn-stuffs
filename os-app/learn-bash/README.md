<!-- : ' 
REF: 
https://linuxize.com/post/bash-if-else-statement/
https://www.w3schools.io/terminal/bash-loop-file-content/
https://www.geeksforgeeks.org/chaining-commands-in-linux/
'   -->

## Some Operators:
| Operator | Function |
|---|---|
| & (Ampersand) | Sends a process/script/command to the background. |
| && (Logical AND) | The command following this operator will only execute if the command preceding this operator has been successfully executed. |
| ; (Semi-colon) | The command following this operator will execute even if the command preceding this operator is not successfully executed. |
| \|\|  (Logical OR) | The command succeeding this operator is only executed if the command preceding it has failed. |
| \| (Pipe) | The output of the first command acts as input to the second command. |
| ! (NOT) | Negates an expression within a command. It is much like an “except” statement. |
| >, >>, < (Redirection) | Redirects the output of a command or a group of commands to a file or stream. |
| &&-\|\| (AND-OR) | It is a combination of AND OR operator and is similar to the if-else statement. |
| \ (Concatenation) | Used to concatenate large commands over several lines in the shell. |
| () (Precedence) | Allows command to execute in precedence order. |
| {} (Combination) | The execution of the command succeeding this operator depends on the execution of the first command. |

## Below are some of the most commonly used operators:
| Operator | Function |
|---|---|
| `-n VAR` | True if the length of `VAR` is greater than zero. |
| `-z VAR` | True if the `VAR` is empty. |
| `STRING1 = STRING2` | True if `STRING1` and `STRING2` are equal. |
| `STRING1 != STRING2` | True if `STRING1` and `STRING2` are not equal. |
| `INTEGER1 -eq INTEGER2` | True if `INTEGER1` and `INTEGER2` are equal. |
| `INTEGER1 -gt INTEGER2` | True if `INTEGER1` is greater than `INTEGER2`. |
| `INTEGER1 -lt INTEGER2` | True if `INTEGER1` is less than `INTEGER2`. |
| `INTEGER1 -ge INTEGER2` | True if `INTEGER1` is equal or greater than `INTEGER2`. |
| `INTEGER1 -le INTEGER2` | True if `INTEGER1` is equal or less than `INTEGER2`. |
| `-h FILE` | True if the `FILE` exists and is a symbolic link. |
| `-r FILE` | True if the `FILE` exists and is readable. |
| `-w FILE` | True if the `FILE` exists and is writable. |
| `-x FILE` | True if the `FILE` exists and is executable. |
| `-d FILE` | True if the `FILE` exists and is a directory. |
| `-e FILE` | True if the `FILE` exists and is a file, regardless of type (node, directory, socket, etc.). |
| `-f FILE` | True if the `FILE` exists and is a regular file (not a directory or device). |

## Test Operators
In Bash, the test command takes one of the following syntax forms:

```bash 
test EXPRESSION
[ EXPRESSION ]
[[ EXPRESSION ]] #safer
```
- To make the script portable, prefer using the old test [ command, which is available on all POSIX shells. The new upgraded version of the test command [[ (double brackets) is supported on most modern systems using Bash, Zsh, and Ksh as a default shell.

- To negate the test expression, use the logical NOT (!) operator. When comparing strings , always use single or double quotes to avoid word splitting and globbing issues.