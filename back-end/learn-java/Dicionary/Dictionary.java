/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.duyphuc;

import com.sun.javafx.scene.control.skin.VirtualFlow;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Duy Phuc
 */
public class Dictionary {
    List<Word> words = new ArrayList<Word>();

    public Dictionary() {
    }
    
    public void add(String en, String vn) {
        Word word = new Word();
        word.setId(this.words.size()+1);
        word.setEn(en);
        word.setVn(vn);
        this.words.add(word);
    }
    
    public String search_vn(String enSearch) {
        for(Word word: words) {
            if(word.getEn().equalsIgnoreCase(enSearch)) {
                return  word.getVn();
            }
        }
        return null;
    }
    public String search_en(String vnSearch) {
        for(Word word: words) {
            if(word.getVn().equalsIgnoreCase(vnSearch)) {
                return  word.getEn();
            }
        }
        return null;
    }
}
