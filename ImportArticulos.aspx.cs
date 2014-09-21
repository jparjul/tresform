using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;

public partial class ImportArticulos : System.Web.UI.Page
    
{

    public string[,] sItems;

    protected void Page_Load(object sender, EventArgs e)
    {
        int i=0;

        if (!IsPostBack)
        {
            XmlDocument xdoc = new XmlDocument(); 

            xdoc.Load(Server.MapPath("~/IMPORT/articulos.xml"));

            XmlNodeList xNodelst = xdoc.DocumentElement.SelectNodes("OITM"); 

            sItems = new String[xNodelst.Count, 11];
            foreach (XmlNode xNode in xNodelst)  
            {
                sItems[i, 0] = GetElement(xNode,"ItemCode");
                sItems[i, 1] = GetElement(xNode, "ItemName");
                sItems[i, 2] = GetElement(xNode, "CodeBars");
                sItems[i, 3] = GetElement(xNode, "SalUnitMsr");
                sItems[i, 4] = GetElement(xNode, "NumInSale");
                sItems[i, 5] = GetElement(xNode, "ItemType");
                sItems[i, 6] = GetElement(xNode, "IVA");
                sItems[i, 7] = GetElement(xNode, "RecEquivalencia");
                sItems[i, 8] = GetElement(xNode, "PesoBruto");
                sItems[i, 9] = GetElement(xNode, "PesoNeto");
                sItems[i, 10] = GetElement(xNode, "PesoEscurrido");

                i++;
            }
            xNodelst = null;
            xdoc = null;
        }
    }

    private string GetElement(XmlNode oNode, string sName)
    {
        string sValue = "";

        try
        {
            sValue = oNode[sName].InnerText;
        }
        catch (Exception ex)
        {

        }

        return sValue;
    }
}