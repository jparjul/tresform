using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class ImportPrecios : System.Web.UI.Page
{
    public string[,] sItems;

    protected void Page_Load(object sender, EventArgs e)
    {
        int i = 0;
        int iLineCount = 0;

        if (!IsPostBack)
        {
            string sFilePath = Server.MapPath("~/IMPORT/precios.xml");

            if (File.Exists(sFilePath))
            {
                StreamReader oFile = null;
                string sLine = String.Empty;
                iLineCount = GetLineCount(sFilePath);

                try
                {
                    oFile = new StreamReader(sFilePath);

                    sItems = new String[iLineCount, 3];
                    
                    if (iLineCount >0)
                    {
                        while ((sLine = oFile.ReadLine()) != null)
                        {
                            string[] sFields = sLine.Split(';');

                            if (sFields.GetUpperBound(0) == 2)
                            {
                                if ((sFields[0].Trim() != String.Empty) && sFields[2] != "0")
                                {
                                    sItems[i, 0] = sFields[0];
                                    sItems[i, 1] = sFields[1];
                                    sItems[i, 2] = sFields[2];

                                    i++;
                                }
                            }
 
                        }

                        String[,] tempReDim = new String[i,3];
                        if (sItems != null)
                            System.Array.Copy(sItems, tempReDim,
                            System.Math.Min(sItems.Length, tempReDim.Length));
                        sItems = tempReDim;
                    }
                }
                finally
                {
                    if (oFile != null)
                        oFile.Close();

                }
            } 

 
        }
    }

    private int GetLineCount(string sPath)
    {
        int iLineCount =0;

        try
        {
            string[] lines = System.IO.File.ReadAllLines(sPath);
            iLineCount = lines.GetUpperBound(0);
        }
        catch (Exception ex)
        {
        }

        return iLineCount;
    }

    
}