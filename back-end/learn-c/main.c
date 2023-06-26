#include <stdio.h>
#include <stdlib.h>

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

void main()
{
    char ho[2], ten[2], dem[2];
    printf("Nhap vao ho cua ban: ");
    scanf("%s",&ho);

    printf("Nhap vao ten dem cua ban: ");
    scanf("%s",&dem);

    printf("Nhap vao ten cua ban: ");
    scanf("%s",&ten);

    printf("Ho: %s\nDem: %s\nTen: %s.",ho,dem,ten);
}

