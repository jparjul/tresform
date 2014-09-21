using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.IO;


public partial class Importacion : System.Web.UI.Page
{
    public string[,] sItems;
    public string[,] sCustomers;
    public string[,] sAddresses;
    public string[,] sVentas;
    public string[,] sPrices;

    protected void Page_Load(object sender, EventArgs e)
    {
        int i = 0;

        if (!IsPostBack)
        {
            LoadItems();
            LoadCustomers();
            LoadVentas();
            LoadPrecios();

        }
    }

    private void LoadItems()
    {
        int i = 0;

        XmlDocument xdoc = new XmlDocument();

        xdoc.Load(Server.MapPath("~/IMPORT/articulos.xml"));

        XmlNodeList xNodelst = xdoc.DocumentElement.SelectNodes("OITM");

        sItems = new String[xNodelst.Count, 11];
        foreach (XmlNode xNode in xNodelst)
        {
            sItems[i, 0] = GetElement(xNode, "ItemCode");
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
        xdoc = null;
        xNodelst = null;
    }

    private void LoadCustomers()
    {
        int i = 0;
        try
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
            sAddresses = new String[xNodelst.Count, 9];
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

            xdoc = null;
            xNodelst = null;

        }
        catch (Exception ex)
        {

        }
        finally
        {

        }
    }

    private void LoadVentas()
    {
        int i = 0;
        XmlDocument xdoc = new XmlDocument();

        xdoc.Load(Server.MapPath("~/IMPORT/ventas.xml"));

        XmlNodeList xNodelst = xdoc.DocumentElement.SelectNodes("VENTAS");
        
        sVentas = new String[xNodelst.Count, 6];
        foreach (XmlNode xNode in xNodelst)
        {
            sVentas[i, 0] = GetElement(xNode, "CardCode");
            sVentas[i, 1] = GetElement(xNode, "CardName");
            sVentas[i, 2] = GetElement(xNode, "ItemCode");
            sVentas[i, 3] = GetElement(xNode, "ItemName");
            sVentas[i, 4] = GetElement(xNode, "Quantity");
            sVentas[i, 5] = GetElement(xNode, "StockSum");

            i++;
        }
        xdoc = null;
        xNodelst = null;
    }

    private void LoadPrecios()
    {
        int iLineCount = 0;
        int i = 0;

        string sFilePath = Server.MapPath("~/IMPORT/precios.xml");

        if (File.Exists(sFilePath))
        {
            StreamReader oFile = null;
            string sLine = String.Empty;
            iLineCount = GetLineCount(sFilePath);

            try
            {
                oFile = new StreamReader(sFilePath);

                sPrices = new String[iLineCount, 3];

                if (iLineCount > 0)
                {
                    while ((sLine = oFile.ReadLine()) != null)
                    {
                        string[] sFields = sLine.Split(';');

                        if (sFields.GetUpperBound(0) == 2)
                        {
                            if ((sFields[0].Trim() != String.Empty) && sFields[2] != "0")
                            {
                                sPrices[i, 0] = sFields[0];
                                sPrices[i, 1] = sFields[1];
                                sPrices[i, 2] = sFields[2];

                                i++;
                            }
                        }

                    }

                    String[,] tempReDim = new String[i, 3];
                    if (sPrices != null)
                        System.Array.Copy(sPrices, tempReDim,
                        System.Math.Min(sPrices.Length, tempReDim.Length));
                    sPrices = tempReDim;
                }
            }
            finally
            {
                if (oFile != null)
                    oFile.Close();

            }
        } 
    }

    private string GetElement(XmlNode oNode, string sName)
    {
        string sValue = String.Empty;
        string sFormatValue = String.Empty;

        try
        {
            sValue = oNode[sName].InnerText;
            sFormatValue= sValue.Replace("\"", "").Replace("\"", "").Replace("'", "");
        }
        catch (Exception ex)
        {

        }

        return sFormatValue;
    }

    private int GetLineCount(string sPath)
    {
        int iLineCount = 0;

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