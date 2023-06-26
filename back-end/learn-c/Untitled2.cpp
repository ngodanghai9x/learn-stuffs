#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    char a[5]= {'h','e','l','l','o'};
    char b[3];
    // strcpy(b,a);
    strncpy(b, a, sizeof(b) - 1);
    printf(" a=%s ;\n b=%s",a,b);

    return 0;
}

