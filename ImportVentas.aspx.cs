using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;

public partial class ImportVentas : System.Web.UI.Page
{
    public string[,] sItems;

    protected void Page_Load(object sender, EventArgs e)
    {
        int i = 0;

        if (!IsPostBack)
        {
            XmlDocument xdoc = new XmlDocument();

            xdoc.Load(Server.MapPath("~/IMPORT/ventas.xml"));

            XmlNodeList xNodelst = xdoc.DocumentElement.SelectNodes("VENTAS");

            sItems = new String[xNodelst.Count, 18];
            foreach (XmlNode xNode in xNodelst)
            {
                sItems[i, 0] = GetElement(xNode, "CardCode");
                sItems[i, 1] = GetElement(xNode, "CardName");
                sItems[i, 2] = GetElement(xNode, "ItemCode");
                sItems[i, 3] = GetElement(xNode, "ItemName");
                sItems[i, 4] = GetElement(xNode, "Quantity");
                sItems[i, 5] = GetElement(xNode, "StockSum");

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
            sValue = oNode[sName].InnerText.Replace('"', Char.MinValue);
        }
        catch (Exception ex)
        {

        }

        return sValue;
    }
}