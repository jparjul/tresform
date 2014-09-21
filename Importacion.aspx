<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Importacion.aspx.cs" Inherits="Importacion" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1">

   <meta name="apple-mobile-web-app-capable" content="yes" />
   <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/>

    <link rel="stylesheet" href="jquery.mobile-1.1.0/jquery-mobile-960.min.css" />
    <link rel="stylesheet" href="jquery.mobile-1.1.0/jquery.mobile-1.1.0.min.css" />
    <script src="jquery.mobile-1.1.0/jquery-1.7.1.min.js"></script>

      
    <script src="jquery.mobile-1.1.0/jquery.mobile-1.1.0.min.js"></script>

     <script language="javascript" type="text/javascript" src="SBODatabase.js"></script>


    <script type="text/javascript">

        var Cliente = null;
        var NombreCliente = "";
        var myDB;
        var iImportItems=0;
        var iImportCustomers=0;
        var iImportAddresses=0;
        var iImportVentas=0;
        var iImportPrices=0;
        var sProgreso;



        $("#import").live("pageinit", function (event) {

            myDB = OpenDatabase(nullDataHandler, errorfunction);

            ImportItems( );
            ImportCustomers( );
            ImportVentas( );
            ImportPrices( endfunction);


            
        });

        function ImportItems() {
            var i;
            var sItemCode,sItemName,sEanCode,sSalUnitMsr,sNumInSale,sItemType,sIVA,sRecEquivalencia,sPesoBruto,sPesoNeto,sPesoEscurrido

            try {


                myDB.transaction(
                    function (transaction) {

                        $('#msg1').text("Importando Precios .....");

                        transaction.executeSql('DELETE  FROM AX_OITM', [], nullDataHandler, killTransaction);

                        <% int iTotal = sItems.GetUpperBound(0);
                           for (int i=0;i<sItems.GetUpperBound(0);i++)
                        {%>
                           

                            sIVA=0;sRecEquivalencia=0;sPesoBruto=0;sPesoNeto=0;sPesoEscurrido=0;
                            sItemCode = "<%=sItems[i,0]%>";
                            sItemName = "<%=sItems[i,1]%>";
                            sEanCode = "<%=sItems[i,2]%>";
                            sSalUnitMsr = "<%=sItems[i,3]%>";
                            sNumInSale = <%=sItems[i,4]%>;
                            sItemType = "<%=sItems[i,5]%>";
                            sIVA = <%=sItems[i,6]%>;
                            <%if (sItems[i,7] != String.Empty) %>
                                 sRecEquivalencia = <%=sItems[i,7]%>;
                            <%if (sItems[i,8] != String.Empty) %>
                                 sPesoBruto = <%=sItems[i,8]%>;
                            <%if (sItems[i,9] != String.Empty) %>
                                 sPesoNeto = <%=sItems[i,9]%>;
                            <%if (sItems[i,10] != String.Empty) %>
                                 sPesoEscurrido = <%=sItems[i,10]%>;
   
                                 $.mobile.showPageLoadingMsg("a", "Procesando Articulos....<%=i.ToString()%> de <%=iTotal.ToString()%>", false);
 
                                transaction.executeSql('INSERT INTO AX_OITM VALUES  (?, ?, ?,?, ?, ?,?, ?,?, ?)', [sItemCode, sItemName, sEanCode , sSalUnitMsr, sNumInSale, sIVA, sRecEquivalencia, sPesoBruto, sPesoNeto,sPesoEscurrido],
                                nullDataHandler, killTransaction);

                            iImportItems++;

                        <% }%>

                        
                        var sMsg = "Se han importado correctamente " + iImportItems.toString() + " articulos." ; 
                        $('#msg1').text(sMsg);
                    }
             );

           }
            catch (e) {
                errorfunction(e);
            }
        }

        function ImportCustomers()
        {
            var i;
            var sCardCode,sCardName,sAddress,sZipCode,sMailAddres,sMailZipCod,sNotes,sCity,sCountry
            var sMailCity,sMailCountr,sState1,sState2,sShipToDef,sLicTradNum,sBankCountr,sBillToDef,sRecEquivalencia
            var sZipCode,sBlock

             try {

                myDB.transaction(
                    function (transaction) {

                        $('#msg2').text("Importando Clientes .....");

                        transaction.executeSql('DELETE  FROM AX_OCRD', [], nullDataHandler, killTransaction);

                        <% iTotal = sCustomers.GetUpperBound(0);
                           for (int i=0;i<sCustomers.GetUpperBound(0);i++)
                        {%>

                            sCardCode =  "<%=sCustomers[i,0]%>";
                            sCardName =  "<%=sCustomers[i,1]%>";
                            sAddress  =  "<%=sCustomers[i,2]%>";
                            sZipCode =  "<%=sCustomers[i,3]%>";
                            sMailAddres =  "<%=sCustomers[i,4]%>";
                            sMailZipCod =  "<%=sCustomers[i,5]%>";
                            sNotes =  "<%=sCustomers[i,6]%>";
                            sCity =  "<%=sCustomers[i,7]%>";
                            sCountry =  "<%=sCustomers[i,8]%>";
                            sMailCity =  "<%=sCustomers[i,9]%>";
                            sMailCountr =  "<%=sCustomers[i,10]%>";
                            sState1 =  "<%=sCustomers[i,11]%>";
                            sState2 =  "<%=sCustomers[i,12]%>";
                            sShipToDef =  "<%=sCustomers[i,13]%>";
                            sLicTradNum =  "<%=sCustomers[i,14]%>";
                            sBankCountr =  "<%=sCustomers[i,15]%>";
                            sBillToDef =  "<%=sCustomers[i,16]%>";
                            sRecEquivalencia =  "<%=sCustomers[i,17]%>";

                             $.mobile.showPageLoadingMsg("a", "Procesando Clientes....<%=i.ToString()%> de <%=iTotal.ToString()%>", false);

                                transaction.executeSql('INSERT INTO AX_OCRD VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [sCardCode, sCardName, sLicTradNum, sAddress, sMailAddres, sMailZipCod, sCity, '', '', '', 'compras@clienteferrer.com', 'Josefa Gutierrez', 'DISTRIBUCION', 'A3'],
                                nullDataHandler, killTransaction);

                            iImportCustomers++;

                        <% }%>

                        var sMsg = "Se han importado correctamente " + iImportCustomers.toString() + " clientes." ; 
                        $('#msg2').text(sMsg);

                        $('#msg3').text("Importando Direcciones .....");
                         transaction.executeSql('DELETE  FROM AX_CRD1', [], nullDataHandler, killTransaction);

                        <% iTotal = sAddresses.GetUpperBound(0);
                           for (int i=0;i<sAddresses.GetUpperBound(0);i++)
                        {%>

                            sAddress =  "<%=sAddresses[i,0]%>";
                            sCardCode =  "<%=sAddresses[i,1]%>";
                            sStreet  =  "<%=sAddresses[i,2]%>";
                            sBlock  =  "<%=sAddresses[i,3]%>";
                            sZipCode =  "<%=sAddresses[i,4]%>";
                            sCity =  "<%=sAddresses[i,5]%>";
                            sCounty =  "<%=sAddresses[i,6]%>";
                            sCountry =  "<%=sAddresses[i,7]%>";
                            sLicTradNum =  "<%=sAddresses[i,8]%>";

                             $.mobile.showPageLoadingMsg("a", "Procesando Direcciones....<%=i.ToString()%> de <%=iTotal.ToString()%>", false);

                                transaction.executeSql('INSERT INTO AX_CRD1 VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?)', [sAddress,sCardCode, sStreet,sBlock,sZipCode,sCity,sCounty,sCountry, sLicTradNum],
                                nullDataHandler, killTransaction);

                            iImportAddresses++;

                        <% }%>

                        sMsg = "Se han importado correctamente " + iImportAddresses.toString() + " direcciones." ; 
                        $('#msg3').text(sMsg);
                    }
             );

            }
            catch (e) {
                errorfunction(e);
            }
        }

        function ImportVentas()
        {
         var i;
            var sItemCode,sItemName,sCardCode,sCardName,sQuantity,sStockSum;

            try {


                myDB.transaction(
                    function (transaction) {

                        $('#msg4').text("Importando Ventas .....");

                        transaction.executeSql('DELETE  FROM AX_VENTAS', [], nullDataHandler, killTransaction);

                        <% iTotal = sVentas.GetUpperBound(0);
                           for (int i=0;i<sVentas.GetUpperBound(0);i++)
                        {%>
                            sQuantity=0;sStockSum=0; 
                            sCardCode = "<%=sVentas[i,0]%>";
                            sCardName = "<%=sVentas[i,1]%>";
                            sItemCode = "<%=sVentas[i,2]%>";
                            sItemName = "<%=sVentas[i,3]%>";
                            <%if (sVentas[i,4] != String.Empty) %>
                                 sQuantity = <%=sVentas[i,4]%>;
                            <%if (sVentas[i,5] != String.Empty) %>
                                 sStockSum = <%=sVentas[i,5]%>;
   
                            $.mobile.showPageLoadingMsg("a", "Procesando Ventas....<%=i.ToString()%> de <%=iTotal.ToString()%>", false);

                                transaction.executeSql('INSERT INTO AX_VENTAS VALUES  (?, ?, ?,?, ?, ?,?)', [sCardCode, sCardName, sItemCode, sItemName, sQuantity,sStockSum, '2012-06-21'],
                                nullDataHandler, killTransaction);


                            iImportVentas++;

                        <% }%>

                        sMsg = "Se han importado correctamente " + iImportVentas.toString() + " ventas." ; 
                        $('#msg4').text(sMsg);
                    }
             );

            }
            catch (e) {
                alert(e);
                errorfunction(e);
            }
        }

        function ImportPrices(endfunction)
        {
        var i;
            var sItemCode,sItemName,sEanCode,sSalUnitMsr,sNumInSale,sItemType,sIVA,sRecEquivalencia,sPesoBruto,sPesoNeto,sPesoEscurrido


            try {

                myDB.transaction(
                    function (transaction) {

                    $('#msg5').text("Importando Precios .....");
                    transaction.executeSql('DELETE  FROM AX_PRECIOS', [], nullDataHandler, killTransaction);

                       <% iTotal = sPrices.GetUpperBound(0);
                          for (int i=0;i<=sPrices.GetUpperBound(0);i++)
                        {%>
                            sPrecio=0;
                            <% if (sPrices[i,1] != null) { %>
                                sCardCode = "<%=sPrices[i,1]%>";
                                sItemCode = "<%=sPrices[i,0]%>";

                                <%if (sPrices[i,2] != String.Empty) %>
                                     sPrecio = <%=sPrices[i,2]%>;

                               $.mobile.showPageLoadingMsg("a", "Procesando Precios....<%=i.ToString()%> de <%=iTotal.ToString()%>", false);

                                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', [sCardCode, sItemCode,sPrecio],
                                    nullDataHandler, killTransaction);

                                iImportPrices++;
                             <% }%>


                        <% 
                        }%>

                        var sMsg = "Se han importado correctamente " + iImportPrices.toString() + " precios." ; 
                        $('#msg5').text(sMsg);
                        endfunction();
                    }
             );

           }
            catch (e) {
                Alert("Invalid database version.");
                errorfunction(e);
            }

        }


        function successfunction() {
            $("#lvResultado").empty();
            $("#lvResultado").append('<li data-role="list-divider">Resultado Importación</li>');
            $("#lvResultado").append(sProgreso);
            $('#lvResultado').listview('refresh', true);
        }

         function progressfunction(sText) {
            $("#lvResultado").empty();
            $("#lvResultado").append('<li data-role="list-divider">Resultado Importación</li>');
            $("#lvResultado").append(sProgreso);
            $("#lvResultado").append(sText);
            $('#lvResultado').listview('refresh', true);
            $("#import").trigger("create");
        }

        function endfunction(sText) {
            alert("Proceso de Importación finalizado");
            $.mobile.hidePageLoadingMsg();
            $.mobile.loadingMessageTextVisible = false;
        }

        function errorHandler(transaction, error) {
            Alert(error.message + ' (Code ' + error.code + ')');
            return true;
        }

        function nullDataHandler(transaction, results) {
        }

        function killTransaction(transaction, error) {
            var sMsg = 'Error;' + error.message + ' (Code ' + error.code + ')' ; 
            $("#lvResultado").append(sMsg);
            return true;  
        }

        function errorfunction(e) {
            if (e == DOMException.INVALID_STATE_ERR) {

                Alert("Invalid database version.");
            } else {
                Alert("Unknown error " + e + ".");
            }
            $.mobile.hidePageLoadingMsg();
        }

        $(document).delegate('#volver', 'click', function () {
           window.location.assign('HerramientasMenu.html');

        });

 
</script>
</head> 

<body>

           <div data-role="page" id="import" data-theme="c" >

	         <div data-role="header">
	            <a href="javascript:window.location.assign('HerramientasMenu.html');" data-icon="back">Anterior</a>
	            <h1>Importación</h1>
                <a href="javascript:window.location.assign('index.html');" data-icon="home">Inicio</a>
            </div>

	        <div data-role="content">	

                <ul data-role="listview" data-inset="true" id="lvResultado" >
                    <li data-role="list-divider">Resultado Importación</li>
                    <li id ="msg1"></li>
                    <li id ="msg2"></li>
                    <li id ="msg3"></li>
                    <li id ="msg4"></li>
                    <li id ="msg5"></li>
				     <li class="ui-body ui-body-b"> 
		                 <fieldset class="ui-grid-b"> 
                              <div data-theme="b" class="ui-block-a"></div> 
		                      <div data-theme="d" class="ui-block-b"><button id="volver" data-theme="a">Volver</button></div> 
                              <div data-theme="b" class="ui-block-c"></div>  
		                </fieldset> 
		             </li> 
  			    </ul>

 
     
            </div> 

              <div data-role="footer"  data-position="fixed" >
                    <div data-role="navbar" data-iconpos="top">
                        <ul>
                            <li><a href="javascript:window.location.assign('RuteroMenu.html');"  data-icon="back" >Rutero</a></li>
                            <li><a href="javascript:window.location.assign('VentasInicio.html');"  data-icon="plus" data-prefetch="true"  >Ventas/Visitas</a></li>
                            <li><a href="javascript:window.location.assign('ClientesGeneral.html');"  data-icon="back" >Interlocutores</a></li>
                            <li><a href="javascript:window.location.assign('Articulos.html');"  data-icon="back" >Articulos</a></li>
                        </ul>                
                </div>
            </div>

         </div>

</body>
