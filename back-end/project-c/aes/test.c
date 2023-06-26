#include <stdio.h>
#include <string.h>
#include <stdint.h>

#define OFB 1

#include "aes.h"
#include "aes.c"
#include "ansix923_padding.h"
#include "ansix923_padding.c"

static void test_encrypt_ofb(void);


int main(void)
{
    int exit=0;

#if defined(AES128)
    printf("\nRun Testing AES128\n\n");
#else
    printf("Exiting");
    return 0;
#endif

    test_encrypt_ofb();

    return exit;
}


static void test_encrypt_ofb(void)
{
    //Initialization Vector
    uint8_t iv[]  = { 0x75, 0x52, 0x5f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x65, 0x73, 0x74, 0x69, 0x6e, 0x67, 0x21, 0x21 };

    uint8_t i;                               
    char* report = "ngo dang hai - at140416 - aes";
    char* key = "73357638792F423F4528482B4B625065";
    int dlen = strlen(report);
    int klen = strlen(key);
    
    printf("THE PLAIN TEXT STRING = ");
    for (i=0; i<dlen;i++){
        printf("%c", report[i]);
    }
    printf("\n");
    
    printf("THE KEY = ");
    for (i=0; i<klen;i++){
        printf("%c", key[i]);
    }
    printf("\n");

    
   
    //Proper Length of report
    int dlenu = dlen;
    if (dlen % 16) {
        dlenu += 16 - (dlen % 16);
        printf("The original length of the STRING = %d and the length of the padded STRING = %d\n", dlen, dlenu);
    }
    
    //Proper length of key
    int klenu = klen;
    if (klen % 16) {
        klenu += 16 - (klen % 16);
        printf("The original length of the KEY = %d and the length of the padded KEY = %d\n", klen, klenu);
    } else {
    	printf("The original length of the KEY = %d\n", klen);
	}
    
    // Make the uint8_t arrays
    uint8_t hexarray[dlenu];
    uint8_t kexarray[klenu];
    
    // Initialize them with zeros
    memset( hexarray, 0, dlenu );
    memset( kexarray, 0, klenu );
    
    // Fill the uint8_t arrays
    for (i=0;i<dlen;i++) {
        hexarray[i] = (uint8_t)report[i];
    }
    for (i=0;i<klen;i++) {
        kexarray[i] = (uint8_t)key[i];
    }                           
  
    int reportPad = ansix923_padding_pad_buffer( hexarray, dlen, sizeof(hexarray), 16 );
    int keyPad = ansix923_padding_pad_buffer( kexarray, klen, sizeof(kexarray), 16 );
    
    printf("The padded STRING in hex is = ");
    for (i=0; i<dlenu;i++){
        printf("%02x",hexarray[i]);
    }
    printf("\n");
    
    printf("The padded key in hex is = ");
    for (i=0; i<klenu;i++){
        printf("%02x",kexarray[i]);
    }
    printf("\n");
        
    // check if the padding is valid
    int valid = ansix923_padding_valid( hexarray, dlen, sizeof(hexarray), 16 );
    printf("Is the ansix923 padding valid  report = %d\n", valid);
    
    //start the encryption
    struct AES_ctx ctx;
    AES_init_ctx_iv(&ctx, kexarray, iv);
    
    // encrypt
    AES_OFB_encrypt_buffer(&ctx, hexarray, dlenu);
    printf("the encrypted STRING = ");
    for (i=0; i<dlenu;i++){
        printf("%02x",hexarray[i]);
    }
    printf("\n");
        
    // reset the iv !! important to work!
    AES_ctx_set_iv(&ctx,iv);
    
    // start decryption
    AES_OFB_decrypt_buffer(&ctx, hexarray, dlenu);
    
    size_t actualDataLength = ansix923_padding_data_length( hexarray, dlenu, 16);
    printf("The actual data length (without the padding) = %ld\n", actualDataLength);
    
    printf("The decrypted STRING in hex = ");
    for (i=0; i<actualDataLength;i++){
        printf("%02x",hexarray[i]);
    }
    printf("\n");
}
