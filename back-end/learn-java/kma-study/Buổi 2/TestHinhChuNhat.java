/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication2;

/**
 *
 * @author chimh
 */
public class TestHinhChuNhat {

     public static void main(String[] args) {
        HinhChuNhat hinhChuNhat = new HinhChuNhat();
         
        // nhap chieu dai va chieu rong
        hinhChuNhat.nhap();
         
        // In ra chieu dai va chieu rong vua nhap
        hinhChuNhat.hienThi(hinhChuNhat.chieuDai, hinhChuNhat.chieuRong);
         
        // tinh chu vi va dien tich
        double chuVi = hinhChuNhat.tinhChuVi(hinhChuNhat.chieuDai, hinhChuNhat.chieuRong);
        double dienTich = hinhChuNhat.tinhDienTich(hinhChuNhat.chieuDai, hinhChuNhat.chieuRong);
         
        // In ket qua tinh
        hinhChuNhat.hienThiChuViVaDienTich(chuVi, dienTich);
    }
    
}
