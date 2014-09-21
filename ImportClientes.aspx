<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImportClientes.aspx.cs" Inherits="ImportClientes" %>

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
        var iImport=0;



        $("#importcustomers").live("pageinit", function (event) {

            var i;
            var sCardCode,sCardName,sAddress,sZipCode,sMailAddres,sMailZipCod,sNotes,sCity,sCountry
            var sMailCity,sMailCountr,sState1,sState2,sShipToDef,sLicTradNum,sBankCountr,sBillToDef,sRecEquivalencia
            var sZipCode,sBlock

 
            try {

            $.mobile.loadingMessageTextVisible = true;
            $.mobile.showPageLoadingMsg("a", "Procesando Clientes...", false);

                myDB = OpenDatabase(successfunction, errorfunction);

                myDB.transaction(
                    function (transaction) {

                        transaction.executeSql('DELETE  FROM AX_OCRD', [], nullDataHandler, killTransaction);

                        <% for (int i=0;i<=sCustomers.GetUpperBound(0);i++)
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

                            transaction.executeSql('INSERT INTO AX_OCRD VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [sCardCode, sCardName, sLicTradNum, sAddress, sMailAddres, sMailZipCod, sCity, '', '', '', 'compras@clienteferrer.com', 'Josefa Gutierrez', 'DISTRIBUCION', 'A3'],
                            nullDataHandler, killTransaction);

                            iImport++;

                        <% }%>

                        var sMsg = "Se han importado correctamente " + iImport.toString() + " clientes." ; 


                         transaction.executeSql('DELETE  FROM AX_CRD1', [], nullDataHandler, killTransaction);

                        <% for (int i=0;i<=sAddresses.GetUpperBound(0);i++)
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


                            transaction.executeSql('INSERT INTO AX_CRD1 VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?)', [sAddress,sCardCode, sStreet,sBlock,sZipCode,sCity,sCounty,sCountry, sLicTradNum],
                            nullDataHandler, killTransaction);

                            iImport++;

                        <% }%>

                        sMsg += "Se han importado correctamente " + iImport.toString() + " direcciones." ; 
                        $('#msg').text(sMsg);
                    }
             );

            }
            catch (e) {
                errorfunction(e);
            }

        });


        function successfunction() {
           // $.mobile.hidePageLoadingMsg();
        }

        function errorHandler(transaction, error) {
            Alert(error.message + ' (Code ' + error.code + ')');
            return true;
        }

        // Cancel.la la transacció
        function killTransaction(transaction, error) {
            alert('Error  ' + error.message + ' (Code ' + error.code + ')'); 
            return true;  
        }


        function nullDataHandler(transaction, results) {
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

 
           <div data-role="page" id="importcustomers" data-theme="c" >

	         <div data-role="header">
	            <a href="javascript:window.location.assign('HerramientasMenu.html');" data-icon="back">Anterior</a>
	            <h1>Importación</h1>
                <a href="javascript:window.location.assign('index.html');" data-icon="home">Inicio</a>
            </div>

	        <div data-role="content">	

                <ul data-role="listview" data-inset="true">
                    <li data-role="list-divider">Importación Clientes</li>
				    <li id ="msg">Importando fichero de Clientes y direcciones. Espere....</li>
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
</html>