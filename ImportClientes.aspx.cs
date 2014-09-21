using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;

public partial class ImportClientes : System.Web.UI.Page
{
    public string[,] sCustomers;
    public string[,] sAddresses;

    protected void Page_Load(object sender, EventArgs e)
    {
        int i = 0;

        if (!IsPostBack)
        {
            XmlDocument xdoc = new XmlDocument();

            xdoc.Load(Server.MapPath("~/IMPORT/clientes.xml"));

            XmlNodeList xNodelst = xdoc.DocumentElement.SelectNodes("OCRD");

            sCustomers = new String[xNodelst.Count, 18];
            foreach (XmlNode xNode in xNodelst)
            {
                sCustomers[i, 0] = GetElement(xNode, "CardCode");
                sCustomers[i, 1] = GetElement(xNode, "CardName");
                sCustomers[i, 2] = GetElement(xNode, "Address");
                sCustomers[i, 3] = GetElement(xNode, "ZipCode");
                sCustomers[i, 4] = GetElement(xNode, "MailAddres");
                sCustomers[i, 5] = GetElement(xNode, "MailZipCod");
                sCustomers[i, 6] = GetElement(xNode, "Notes");
                sCustomers[i, 7] = GetElement(xNode, "City");
                sCustomers[i, 8] = GetElement(xNode, "Country");
                sCustomers[i, 9] = GetElement(xNode, "MailCity");
                sCustomers[i, 10] = GetElement(xNode, "MailCountr");
                sCustomers[i, 11] = GetElement(xNode, "State1");
                sCustomers[i, 12] = GetElement(xNode, "State2");
                sCustomers[i, 13] = GetElement(xNode, "ShipToDef");
                sCustomers[i, 14] = GetElement(xNode, "LicTradNum");
                sCustomers[i, 15] = GetElement(xNode, "BankCountr");
                sCustomers[i, 16] = GetElement(xNode, "BillToDef");
                sCustomers[i, 17] = GetElement(xNode, "RecEquivalencia");

                i++;
            }

            xNodelst = xdoc.DocumentElement.SelectNodes("CRD1");
            i = 0;
            sAddresses = new String[xNodelst.Count,9];
            foreach (XmlNode xNode in xNodelst)
            {
                sAddresses[i, 0] = GetElement(xNode, "Address");
                sAddresses[i, 1] = GetElement(xNode, "CardCode");
                sAddresses[i, 2] = GetElement(xNode, "Street");
                sAddresses[i, 3] = GetElement(xNode, "Street");
                sAddresses[i, 4] = GetElement(xNode, "ZipCode");
                sAddresses[i, 5] = GetElement(xNode, "City");
                sAddresses[i, 6] = GetElement(xNode, "Name");
                sAddresses[i, 7] = GetElement(xNode, "Country");
                sAddresses[i, 8] = GetElement(xNode, "LicTradNum");
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
            sValue = oNode[sName].InnerText.Replace('"',Char.MinValue);
        }
        catch (Exception ex)
        {

        }

        return sValue;
    }
}