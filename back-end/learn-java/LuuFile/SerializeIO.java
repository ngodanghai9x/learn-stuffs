
package LuuFile;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class SerializeIO {
    public static boolean luuFile(Object data, String path)
    {
        try
        {
            FileOutputStream fos = new FileOutputStream(path);
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(data);
            fos.close();
            oos.close();
            return true;
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return false;
    }
    public static Object docFile(String path)
    {
        try
        {
            FileInputStream fis = new FileInputStream(path);
            ObjectInputStream ois = new ObjectInputStream (fis);
            Object data = ois.readObject();
            fis.close();
            ois.close();
            return data;
        }
        catch(Exception e)
                {
                    e.printStackTrace();
                }
        return false;
    }
    
   
}
