#include <stdio.h>
void demo(char *format){
	int x = 12345;
	printf("%-7s: ", format);
	printf(format, x);
	printf("[end]\n");
}
int main(){
	demo("%4d");
	demo("%20d");
	demo("%+20d");
	demo("%x");
	demo("%8x");
	demo("%08x");
	return 0;
}

