/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package duyphuc.com;

import java.util.Scanner;

/**
 *
 * @author Duy Phuc
 */
public class Number {

    private int value;
    private int max;
    private int min;

    public Number() {
    }

    public Number(int value, int max, int min) {
        this.value = value;
        this.max = max;
        this.min = min;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public boolean ktraNguyenTo() {
        int can = (int) Math.sqrt(this.value);
        for (int i = 2; i <= can; i++) {
            if (this.value % i == 0) {
                return false;
            }
        }
        return true;
    }
    
    public void nhap() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Max: ");
        this.max = sc.nextInt();
        System.out.print("Min: ");;
        this.min = sc.nextInt();
        System.out.print("Value: ");
        this.value = sc.nextInt();
    }

    @Override
    public String toString() {
        return this.max+"$"+this.min+"$"+this.value;
    }
    
}
