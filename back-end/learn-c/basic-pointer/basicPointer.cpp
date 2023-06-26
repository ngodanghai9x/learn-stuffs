#include <stdio.h>

int main ()
{
   int  var1 = 15;
   char var2[25];

   printf("Dia chi cua var1 la: %x\n", &var1  );
   printf("Dia chi cua var2 la: %x\n", &var2  );
   printf("-----------------------\n");
   int *pointer1 = &var1;
//   char *pointer2 = &var2;
   
   printf("Dia chi cua var1 la: %x\n", pointer1  );
   printf("Gia tri cua var1 la: %d\n", *pointer1  );
   
//   printf("Dia chi cua var2 la: %x\n", pointer2  );
   printf("-----------------------\n");
   
   int  *contro = NULL;

   printf("Gia tri cua contro la: %x\n", contro  );

//   printf("Gia tri 2 cua contro la: %d\n", *contro  );
   
   return 0;
}
