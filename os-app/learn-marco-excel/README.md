# learn-vba

## set value for variable:
Dim i as Interger = 1  
Dim obj As Object  
Set obj = ThisWorkbook.Sheets(1)  
## return in function
Public Function test() As Integer  
    test = 1  
End Function  

Public Function testRange() As Range  
    Set testRange = Range("A1")  
End Function  


