//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------
var systemDB;
var shortName = 'IPADSEGUI.db';
var version = '1.0';
var displayName = 'Segui Ipad SBO Database';
var maxSize = 10485760; // 10Mb
var SEGUI_URL = 'http://192.168.1.124/SEGUI/IMPORT/';
//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------


//---------------------------------------------------------------------------------
// Inicializa la base de datos local
//---------------------------------------------------------------------------------
function InitializeDatabase(successfunction,errorfunction) {

    try {
        if (!window.openDatabase) {
            alert('El navegador no admite base de datos local');
        } else {
            var myDB = openDatabase(shortName, version, displayName, maxSize);

        }
    } catch (e) {
        errorfunction(e);
        return;
    }
     systemDB = myDB;

     successfunction();

 }


 //---------------------------------------------------------------------------------
 function OpenDatabase(successfunction, errorfunction) {

     try {
         if (!window.openDatabase) {
             alert('El navegador no admite base de datos local');
         } else {
             var myDB = openDatabase(shortName, version, displayName, maxSize);

         }
     } catch (e) {
         errorfunction(e);
         return;
     }
     systemDB = myDB;

     successfunction();

     return systemDB;

 }

 //---------------------------------------------------------------------------------
 // Genera les taules
 //---------------------------------------------------------------------------------
 function InitializeTables(successfunction, errorfunction) {

     try {

         createTable_AX_OCRD(systemDB);
         createTable_AX_CRD1(systemDB);
         createTable_AX_OITM(systemDB);
         createTable_AX_MOTIVOS(systemDB);
         createTable_AX_CONFIG(systemDB);
         createTable_AX_IMPORT(systemDB);
         createTable_AX_VISITAS(systemDB);
         createTable_AX_PROMOS(systemDB);
         createTable_AX_PREGUNTAS(systemDB);
         createTable_AX_VISITAS_PROMOS(systemDB);
         createTable_AX_VISITAS_PREGUNTAS(systemDB);
         createTable_AX_ORDR(systemDB);
         createTable_AX_RDR1(systemDB);
         createTable_AX_TEMP_RDR1(systemDB);
         createTable_AX_VENTAS(systemDB);
         createTable_AX_PRECIOS(systemDB);


     } catch (e) {
         errorfunction(e);
         return;
     }
     successfunction();
 }

 function getDatabase()
 {
 return systemDB; 
 }

//---------------------------------------------------------------
// Crea les taules
//---------------------------------------------------------------
function createTable_AX_OCRD(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_OCRD', [], nullDataHandler, killTransaction);

        transaction.executeSql('CREATE TABLE IF NOT EXISTS AX_OCRD(' +
        'CardCode VARCHAR( 30 ) NOT NULL PRIMARY KEY ,' +
        'CardName VARCHAR( 254 ) NOT NULL,' +
        'LicTradNum VARCHAR( 100 ) NULL,' +
        'Address TEXT NULL,' +
        'Street VARCHAR( 254 ) NULL,' +
        'ZipCode VARCHAR( 254 ) NULL,' +
        'City VARCHAR( 254 ) NULL,' +
        'Phone1 VARCHAR( 100 ) NULL,' +
        'Phone2 VARCHAR( 100 ) NULL,' +
        'Fax VARCHAR( 100 ) NULL,' +
        'EMail VARCHAR( 254 ) NULL,' +
        'CntctPrsn VARCHAR( 254 ) NULL,' +
        'Clase VARCHAR( 254 ) NULL,' +
        'Tipo VARCHAR( 254 ) NULL);', [], nullDataHandler, killTransaction);
    }
    );
}

//---------------------------------------------------------------
// Crea les taules
//---------------------------------------------------------------
function createTable_AX_CRD1(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_CRD1', [], nullDataHandler, killTransaction);

        transaction.executeSql('CREATE TABLE IF NOT EXISTS AX_CRD1(' +
        'Address    VARCHAR( 50 )   NOT NULL ,' +
        'CardCode   VARCHAR( 15 )   NOT NULL,' +
        'Street     VARCHAR( 100 ),' +
        'Block      VARCHAR( 100 ),' +
        'ZipCode    VARCHAR( 20 ),' +
        'City       VARCHAR( 100 ),' +
        'County     VARCHAR( 100 ),' +
        'Country    VARCHAR( 3 ),' +
        'LicTradNum VARCHAR( 32 ),' +
        'PRIMARY KEY ( Address, CardCode ) )', [], nullDataHandler, killTransaction);
    }
    );
} 

function createTable_AX_OITM(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_OITM', [], nullDataHandler, killTransaction);
        transaction.executeSql('CREATE TABLE IF NOT EXISTS AX_OITM(' +
        'ItemCode VARCHAR( 30 ) NOT NULL PRIMARY KEY ,' +
        'ItemName VARCHAR( 254 ) NOT NULL,' +
        'CodeBars VARCHAR( 254 ) NULL,' +
        'SalUnitMsr NUMERIC NULL,' +
        'NumInSale NUMERIC NULL,' +
        'IVA NUMERIC NULL,' +
        'RecEquivalencia NUMERIC NULL,' +
        'PesoBruto NUMERIC NULL,' +
        'PesoNeto NUMERIC NULL,' +
        'PesoEscurrido NUMERIC NULL);', [], nullDataHandler, killTransaction);
    }
    );
}

function createTable_AX_MOTIVOS(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_MOTIVOS', [], nullDataHandler, killTransaction);
        transaction.executeSql('CREATE TABLE IF NOT EXISTS AX_MOTIVOS(' +
        'Code VARCHAR( 10 ) NOT NULL PRIMARY KEY ,' +
        'Descripcion VARCHAR( 254 ) NOT NULL,' +
        'Orden INTEGER NULL);', [], nullDataHandler, killTransaction);
    }
    );
}

function createTable_AX_CONFIG(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_CONFIG', [], nullDataHandler, killTransaction);
        transaction.executeSql('CREATE TABLE IF NOT EXISTS AX_CONFIG(' +
        'SlpCode VARCHAR( 30 ) NOT NULL PRIMARY KEY ,' +
        'IPLocal TEXT NULL,' +
        'IPRemota TEXT NULL);', [], nullDataHandler, killTransaction);
    }
    );
}

function createTable_AX_IMPORT(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_IMPORT', [], nullDataHandler, killTransaction);
        transaction.executeSql('CREATE TABLE AX_IMPORT ( ' +
        'Proceso    VARCHAR( 100 )  PRIMARY KEY,' +
        'LastImport DATETIME );', [], nullDataHandler, killTransaction);
        transaction.executeSql('INSERT INTO AX_IMPORT VALUES  (?, ?)', ['Articulos', ''], nullDataHandler, killTransaction);
        transaction.executeSql('INSERT INTO AX_IMPORT VALUES  (?, ?)', ['Clientes', ''], nullDataHandler, killTransaction);
        transaction.executeSql('INSERT INTO AX_IMPORT VALUES  (?, ?)', ['Ventas', ''], nullDataHandler, killTransaction);
        transaction.executeSql('INSERT INTO AX_IMPORT VALUES  (?, ?)', ['Precios', ''], nullDataHandler, killTransaction);
        transaction.executeSql('INSERT INTO AX_IMPORT VALUES  (?, ?)', ['Datos Auxiliares', ''], nullDataHandler, killTransaction);
    }
    );
}


function createTable_AX_PROMOS(db) {

    db.transaction(
    function (transaction) {
  
        transaction.executeSql('DROP TABLE IF EXISTS AX_PROMOS', [], nullDataHandler, killTransaction);
        transaction.executeSql('CREATE TABLE IF NOT EXISTS AX_PROMOS(' +
        'Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' +
        'CardCode VARCHAR( 30 ) NOT NULL,' +
        'DescPromo TEXTNULL);', [], nullDataHandler, killTransaction);
    }
    );
}

function createTable_AX_VISITAS(db) {

    db.transaction(
    function (transaction) {
   

        transaction.executeSql('DROP TABLE IF EXISTS AX_VISITAS', [], nullDataHandler, killTransaction);
        transaction.executeSql("CREATE TABLE IF NOT EXISTS AX_VISITAS(" +
        "Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
        "SlpCode INTEGER   NOT NULL," +
        "CardCode VARCHAR( 30 ) NOT NULL," +
        "Comments TEXT ," +
        "Pedido BOOLEAN DEFAULT '0'," +
        "Motivo VARCHAR( 254 ) NULL," +
        "Modo     VARCHAR( 100 )," +
        "CreateDate  DATETIME  DEFAULT ( date( 'now' ) )," +
        "CreateTime NUMERIC  DEFAULT ( time( 'now' )  )," +
        "Send BOOLEAN DEFAULT '0');", [], nullDataHandler, killTransaction);
    }
    );
}

function createTable_AX_VISITAS_PREGUNTAS(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_VISITAS_PREGUNTAS', [], nullDataHandler, killTransaction);
        transaction.executeSql("CREATE TABLE IF NOT EXISTS AX_VISITAS_PREGUNTAS ( " +
            "Id         INTEGER         PRIMARY KEY AUTOINCREMENT NOT NULL," +
            "IdVisita   INTEGER         NOT NULL," +
            "CardCode   VARCHAR( 30 )   NOT NULL," +
            "Pregunta   VARCHAR( 500 )," +
            "Respuesta1 VARCHAR( 500 )," +
            "Respuesta2 VARCHAR( 500 ) );", [], nullDataHandler, killTransaction);
            }
    );
}

function createTable_AX_VISITAS_PROMOS(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_VISITAS_PROMOS', [], nullDataHandler, killTransaction);
        transaction.executeSql("CREATE TABLE IF NOT EXISTS AX_VISITAS_PROMOS ( " +
            "Id       INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL," +
            "IdVisita INTEGER NOT NULL," +
            "IdPromo  INTEGER NOT NULL );", [], nullDataHandler, killTransaction);
            }
    );
}

function createTable_AX_ORDR(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_ORDR', [], nullDataHandler, killTransaction);
        transaction.executeSql("CREATE TABLE IF NOT EXISTS AX_ORDR ( " +
            "Id       INTEGER           PRIMARY KEY AUTOINCREMENT," +
            "IdVisita INTEGER           NOT NULL," +
            "CardCode VARCHAR( 30 )     NOT NULL," +
            "Address  VARCHAR( 254 )," +
            "Date     DATETIME          DEFAULT ( date( 'now' )  )," +
            "Comments TEXT," +
            "DueDate  DATETIME          DEFAULT ( date( 'now' )  )," +
            "Total    NUMERIC( 18, 4 )," +
            "Send     BOOLEAN           DEFAULT '0' " +
            ");", [], nullDataHandler, killTransaction);
            }
    );
}

function createTable_AX_RDR1(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_RDR1', [], nullDataHandler, killTransaction);
        transaction.executeSql("CREATE TABLE IF NOT EXISTS AX_RDR1 ( " +
            "Id       INTEGER           PRIMARY KEY AUTOINCREMENT," +
            "IdVisita INTEGER           NOT NULL," +
            "IdOrdr   INTEGER           NOT NULL," +
            'ItemCode VARCHAR( 30 ) NOT NULL ,' +
            'ItemName VARCHAR( 254 ),' +
            "Quantity    NUMERIC( 18, 4 ) DEFAULT 0," +
            "QuantityFree    NUMERIC( 18, 4 ) DEFAULT 0," +
            "QuantityLastVisit    NUMERIC( 18, 4 ) DEFAULT 0," +
            "Price    NUMERIC( 18, 4 ) DEFAULT 0," +
            "DiscPrcnt    NUMERIC( 18, 4 ) DEFAULT 0 " +
            ");", [], nullDataHandler, killTransaction);
    }
    );
}

function createTable_AX_TEMP_RDR1(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_TEMP_RDR1', [], nullDataHandler, killTransaction);
        transaction.executeSql("CREATE TABLE IF NOT EXISTS AX_TEMP_RDR1 ( " +
            "Id       INTEGER           PRIMARY KEY AUTOINCREMENT," +
            "IdVisita INTEGER           NOT NULL," +
            "IdOrdr   INTEGER           NOT NULL," +
            'ItemCode VARCHAR( 30 ) NOT NULL ,' +
            'ItemName VARCHAR( 254 ),' +
            "Quantity    NUMERIC( 18, 4 ) DEFAULT 0," +
            "QuantityFree    NUMERIC( 18, 4 ) DEFAULT 0," +
            "QuantityLastVisit    NUMERIC( 18, 4 ) DEFAULT 0," +
            "Price    NUMERIC( 18, 4 ) DEFAULT 0," +
            "DiscPrcnt    NUMERIC( 18, 4 ) DEFAULT 0 " +
            ");", [], nullDataHandler, killTransaction);
    }
    );
}

function createTable_AX_VENTAS(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_VENTAS', [], nullDataHandler, killTransaction);
        transaction.executeSql("CREATE TABLE IF NOT EXISTS AX_VENTAS ( " +
            "CardCode VARCHAR( 30 )     NOT NULL," +
            "CardName VARCHAR( 254 )," +
            'ItemCode VARCHAR( 30 ) NOT NULL ,' +
            'ItemName VARCHAR( 254 ),' +
            "Quantity    NUMERIC( 18, 4 ) DEFAULT 0," +
            "StockSum    NUMERIC( 18, 4 ) DEFAULT 0," +
            "LastOrder  DATETIME " +
            ");", [], nullDataHandler, killTransaction);
    }
    );
}

function createTable_AX_PRECIOS(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_PRECIOS', [], nullDataHandler, killTransaction);
        transaction.executeSql("CREATE TABLE IF NOT EXISTS AX_PRECIOS ( " +
            "CardCode VARCHAR( 30 )     NOT NULL," +
            'ItemCode VARCHAR( 30 ) NOT NULL ,' +
            "Price    NUMERIC( 18, 4 ) DEFAULT 0, " +
            "PRIMARY KEY ( CardCode, ItemCode ) " +
            ");", [], nullDataHandler, killTransaction);
    }
    );
}

function createTable_AX_PREGUNTAS(db) {

    db.transaction(
    function (transaction) {

        transaction.executeSql('DROP TABLE IF EXISTS AX_PREGUNTAS', [], nullDataHandler, killTransaction);
        transaction.executeSql("CREATE TABLE IF NOT EXISTS AX_PREGUNTAS ( " +
            "Id       INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL," +
            "Pregunta VARCHAR( 500 ) NOT NULL );", [], nullDataHandler, killTransaction);
    }
    );
}

function buildPage( ){
        $("#endSessionForm").empty();
        var div = "<div><label>aaa</label><input></input></div>";
        div += "<div><label>bbb</label><input></input></div>";
        div += "<div><select><option>1</option><option>2</option><option>3</option></select></div>";
        $('#endSessionForm').append(div);
        $("#endSessionForm").trigger('create');
    };

//---------------------------------------------------------------------------------
// Inicializa las lineas de Pedido (Inserta las lineas existentes en AX_VENTAS)
//---------------------------------------------------------------------------------
    function InitializeTempOrderLines(OrderId, VisitaId, CardCode, successfunction, errorfunction) {

    try {

         if (!window.openDatabase) {
            alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(

                    function (transaction) {

                        //transaction.executeSql("DELETE FROM AX_TEMP_RDR1", [],nullDataHandler, killTransaction);

                        var query = "INSERT INTO AX_TEMP_RDR1 (IdVisita,IdOrdr,ItemCode,ItemName,Quantity,QuantityFree,QuantityLastVisit,Price,DiscPrcnt) " +
                                    " SELECT " + VisitaId.toString() + "," + OrderId.toString() + ",T0.ItemCode,T0.ItemName,0,0,0,T1.Price,0 FROM AX_VENTAS T0" +
                                    " LEFT OUTER JOIN AX_PRECIOS T1 ON T1.ItemCode = T0.ItemCode AND T1.CardCode = T0.CardCode " +
                                    " WHERE '" + OrderId.toString() + "' NOT IN (SELECT DISTINCT IdOrdr FROM AX_TEMP_RDR1) AND T0.CardCode = '" + CardCode.toString() + "'";
                        transaction.executeSql(query, [],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

    //---------------------------------------------------------------------------------
    // Inserta una nueva linea de Pedido
    //---------------------------------------------------------------------------------
    function InsertTempOrderLines(OrderId, VisitaId, CardCode, NewItemId, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "INSERT INTO AX_TEMP_RDR1 (IdVisita,IdOrdr,ItemCode,ItemName,Quantity,QuantityFree,Price,DiscPrcnt) " +
                          " SELECT " + VisitaId.toString() + "," + OrderId.toString() + ",T0.ItemCode,T0.ItemName,1,0,T1.Price,0 FROM AX_OITM T0 " +
                          " LEFT OUTER JOIN AX_PRECIOS T1 ON T0.ItemCode = T1.ItemCode AND T1.CardCode = '" + CardCode.toString() + "'" +
                          " WHERE T0.ItemCode = '" + NewItemId.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

  

    //---------------------------------------------------------------------------------
    // Copia las lineas de Pedido de la tabla temporal
    //---------------------------------------------------------------------------------
    function SaveOrderLines(OrderId, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "INSERT INTO AX_RDR1 SELECT * FROM AX_TEMP_RDR1 " +
                          " WHERE AX_TEMP_RDR1.IdOrdr = " + Pedido.toString() + " AND Quantity >0";
                        transaction.executeSql(sQuery, [], nullDataHandler, killTransaction);

                        // transaction.executeSql("DELETE FROM AX_TEMP_RDR1", [], nullDataHandler, killTransaction);


                        successfunction();

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
    }

    //---------------------------------------------------------------------------------
    // Inserta una nueva linea de Pedido
    //---------------------------------------------------------------------------------
    function InsertOrderLines(OrderId, VisitaId, CardCode, NewItemId, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "INSERT INTO AX_RDR1 (IdVisita,IdOrdr,ItemCode,ItemName,Quantity,QuantityFree,Price,DiscPrcnt) " +
                          " SELECT " + VisitaId.toString() + "," + OrderId.toString() + ",T0.ItemCode,T0.ItemName,1,0,T1.Price,0 FROM AX_OITM T0 " +
                          " LEFT OUTER JOIN AX_PRECIOS T1 ON T0.ItemCode = T1.ItemCode AND T1.CardCode = '" + CardCode.toString() + "'" +
                          " WHERE T0.ItemCode = '" + NewItemId.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }


    //---------------------------------------------------------------------------------
    // Inicializa las lineas de Pedido (Inserta las lineas existentes en AX_VENTAS)
    //---------------------------------------------------------------------------------
    function DeleteTempOrderLine(LineId, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "DELETE  FROM AX_TEMP_RDR1 WHERE Id = '" + LineId.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

    //---------------------------------------------------------------------------------
    // Inicializa las lineas de Pedido (Inserta las lineas existentes en AX_VENTAS)
    //---------------------------------------------------------------------------------
    function DeleteOrderLine(LineId, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "DELETE  FROM AX_RDR1 WHERE Id = '" + LineId.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

    //---------------------------------------------------------------------------------
    // Elimina un Pedido
    //---------------------------------------------------------------------------------
    function DeleteOrder(Pedido,  successfunction,errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "DELETE  FROM AX_ORDR WHERE Id = '" + Pedido.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

//                        sQuery = "DELETE  FROM AX_TEMP_RDR1 WHERE IdOrdr = '" + Pedido.toString() + "'";
//                        transaction.executeSql(sQuery, [],
//                             nullDataHandler, killTransaction);

                        sQuery = "DELETE  FROM AX_RDR1 WHERE IdOrdr = '" + Pedido.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

      

                    }
            );

            systemDB.transaction(
                    function (transaction) {
//                        var sQuery = "DELETE  FROM AX_ORDR WHERE Id = '" + Pedido.toString() + "'";
//                        transaction.executeSql(sQuery, [],
//                             nullDataHandler, killTransaction);

                        //                        sQuery = "DELETE  FROM AX_TEMP_RDR1 WHERE IdOrdr = '" + Pedido.toString() + "'";
                        //                        transaction.executeSql(sQuery, [],
                        //                             nullDataHandler, killTransaction);

                        sQuery = "DELETE  FROM AX_RDR1 WHERE IdOrdr = '" + Pedido.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                        successfunction();

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }

    }

    //---------------------------------------------------------------------------------
    // Elimina las lineas de Pedido sin cantidad
    //---------------------------------------------------------------------------------
    function DeleteTempOrderLines(orderid, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "DELETE  FROM AX_TEMP_RDR1 WHERE Quantity =0 AND IdOrdr = '" + orderid.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

    //---------------------------------------------------------------------------------
    // Elimina las lineas de Pedido sin cantidad
    //---------------------------------------------------------------------------------
    function DeleteOrderLines( orderid,successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "DELETE  FROM AX_RDR1 WHERE Quantity =0 AND IdOrdr = '" + orderid.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

    //---------------------------------------------------------------------------------
    // Inicializa las cantidades a cero
    //---------------------------------------------------------------------------------
    function ResetTempOrderLines(orderid, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "UPDATE AX_TEMP_RDR1 SET Quantity =0,QuantityFree =0 WHERE IdOrdr = '" + orderid.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

    //---------------------------------------------------------------------------------
    // Inicializa las cantidades a cero
    //---------------------------------------------------------------------------------
    function ResetOrderLines(orderid, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sQuery = "UPDATE AX_RDR1 SET Quantity =0,QuantityFree =0 WHERE IdOrdr = '" + orderid.toString() + "'";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

    //---------------------------------------------------------------------------------
    // Inicializa las cantidades a cero
    //---------------------------------------------------------------------------------
    function UpdateOrdersSend(sSelectedOrders, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        var sSQL = "UPDATE AX_ORDR SET Send=1 WHERE Id IN (" + sSelectedOrders + ")";
                        transaction.executeSql(sSQL, [],nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }


    //---------------------------------------------------------------------------------
    // Inicializa las cantidades a cero
    //---------------------------------------------------------------------------------
    function UpdateVisitsSend(sSelectedOrders, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {

                        var sSQL = "UPDATE AX_VISITAS SET Send=1 WHERE Id IN (" + sSelectedOrders + ")";
                        transaction.executeSql(sSQL, [],nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

    //---------------------------------------------------------------------------------
    // Inicializa las cantidades a cero
    //---------------------------------------------------------------------------------
    function UpdateLastImport(sKey, successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {
                        transaction.executeSql("UPDATE AX_IMPORT SET LastImport=datetime( 'now' ) WHERE Proceso IN (?)", [sKey],
                             nullDataHandler, killTransaction);

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }

    //---------------------------------------------------------------------------------
    // Elimina un Pedido
    //---------------------------------------------------------------------------------
    function DeleteTempTable(successfunction, errorfunction) {

        try {

            if (!window.openDatabase) {
                alert('not supported');
            } else {
                var myDB = openDatabase(shortName, version, displayName, maxSize);

                systemDB = myDB;

            }

            systemDB.transaction(
                    function (transaction) {

                        var sQuery = "DELETE  FROM AX_TEMP_RDR1";
                        transaction.executeSql(sQuery, [],
                             nullDataHandler, killTransaction);

                        successfunction();

                    }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }

    }

//---------------------------------------------------------------------------------
// Inserta datos de test
//---------------------------------------------------------------------------------
function InsertTestData(successfunction, errorfunction) {

    try {

         if (!window.openDatabase) {
            alert('not supported');
        } else {
            var myDB = openDatabase(shortName, version, displayName, maxSize);

            systemDB = myDB;

        }

        systemDB.transaction(
                function (transaction) {
                    transaction.executeSql('DELETE  FROM AX_MOTIVOS', [],
                         nullDataHandler, killTransaction);
                    transaction.executeSql('INSERT INTO AX_MOTIVOS VALUES  (?, ?, ?)', ['1', 'motivo 111', 1],
                         nullDataHandler, killTransaction);
                    transaction.executeSql('INSERT INTO AX_MOTIVOS VALUES  (?, ?, ?)', ['2', 'motivo 222', 2],
                         nullDataHandler, killTransaction);
                    transaction.executeSql('INSERT INTO AX_MOTIVOS VALUES  (?, ?, ?)', ['3', 'motivo 333', 3],
                         nullDataHandler, killTransaction);

                    transaction.executeSql('DELETE  FROM AX_PROMOS', [],
                         nullDataHandler, killTransaction);
                    transaction.executeSql('INSERT INTO AX_PROMOS VALUES  (?, ?, ?)', ['1', 'C00001', 'Promoción 111'],
                         nullDataHandler, killTransaction);
                    transaction.executeSql('INSERT INTO AX_PROMOS VALUES  (?, ?, ?)', ['2', 'C00001', 'Promoción 22'],
                         nullDataHandler, killTransaction);
                    transaction.executeSql('INSERT INTO AX_PROMOS VALUES  (?, ?, ?)', ['3', 'C00001', 'Promoción 33'],
                         nullDataHandler, killTransaction);


                    transaction.executeSql('DELETE  FROM AX_PREGUNTAS', [],
                         nullDataHandler, killTransaction);
                    transaction.executeSql('INSERT INTO AX_PREGUNTAS VALUES  (?, ?)', ['1', 'Como està el cliente ?'],
                         nullDataHandler, killTransaction);
                    transaction.executeSql('INSERT INTO AX_PREGUNTAS VALUES  (?, ?)', ['2', 'Le gustan los productos nuevos ?'],
                         nullDataHandler, killTransaction);
                    transaction.executeSql('INSERT INTO AX_PREGUNTAS VALUES  (?, ?)', ['3', 'Està arruinado ?'],
                         nullDataHandler, killTransaction);

//                    transaction.executeSql('DELETE  FROM AX_OCRD', [],
//                         nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_OCRD VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ['C00001', 'El Corte Ingles s.a.', '8768768760', 'Plaza Catalunya', 'Plaza Catalunya s/n','08777','Barcelona','93777788888','','9378658768','compras@elcorteingles.com','Jose Gutierrez','DISTRIBUCION','A1'],
//                         nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_OCRD VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ['C00002', 'Alimentacion Josefa', '8768768760', 'Carrer Major', 'Carrer Major 456', '98888', 'Tarragona', '93777788888', '', '9378658768', 'compras@josefa.com', 'Josefa Gutierrez', 'ULTRAMARINOS/PEQUEÑO SUPER', 'A3'],
//                         nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_OCRD VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ['C00003', 'Cliente Ferrer 003', '8768768760', 'Carrer Major', 'Carrer Major 456', '98888', 'Tarragona', '93777788888', '', '9378658768', 'compras@clienteferrer.com', 'Josefa Gutierrez', 'DISTRIBUCION', 'A3'],
//                         nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_OCRD VALUES  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', ['C00004', 'Cliente Ferrer 004', '8768768760', 'Carrer Major', 'Carrer Major 456', '98888', 'Tarragona', '93777788888', '', '9378658768', 'compras@clienteferrer.com', 'Josefa Gutierrez', 'DISTRIBUCION', 'A3'],
//                         nullDataHandler, killTransaction);

//                    transaction.executeSql('DELETE  FROM AX_OITM', [], nullDataHandler, killTransaction);

//                    transaction.executeSql('INSERT INTO AX_OITM VALUES  (?, ?, ?,?, ?, ?,?, ?,?, ?)', ['ITEM001', 'DESCRIPCION ITEM001', '8412345678', 1, 1, 18, 0, 10, 12, 13],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_OITM VALUES  (?, ?, ?,?, ?, ?,?, ?,?, ?)', ['ITEM002', 'DESCRIPCION ITEM002', '8412345678', 1, 1, 18, 0, 20, 22, 23],
//                    nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_OITM VALUES  (?, ?, ?,?, ?, ?,?, ?,?, ?)', ['ITEM003', 'DESCRIPCION ITEM003', '8412345678', 1, 1, 18, 0, 30, 32, 33],
//                    nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_OITM VALUES  (?, ?, ?,?, ?, ?,?, ?,?, ?)', ['ITEM004', 'DESCRIPCION ITEM004', '8412345678', 1, 1, 18, 0, 40, 42, 43],
//                    nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_OITM VALUES  (?, ?, ?,?, ?, ?,?, ?,?, ?)', ['ITEM005', 'DESCRIPCION ITEM005', '8412345678', 1, 1, 18, 0, 50, 52, 53],
//                    nullDataHandler, killTransaction);

//                    transaction.executeSql('DELETE  FROM AX_VENTAS', [], nullDataHandler, killTransaction);

//                    transaction.executeSql('INSERT INTO AX_VENTAS VALUES  (?, ?, ?,?, ?, ?,?)', ['C00001', 'El Corte Ingles s.a.', 'ITEM001', 'DESCRIPCION ITEM001', 23, 12, '2012-06-21'],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_VENTAS VALUES  (?, ?, ?,?, ?, ?,?)', ['C00001', 'El Corte Ingles s.a.', 'ITEM002', 'DESCRIPCION ITEM002', 45, 1, '2012-07-21'],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_VENTAS VALUES  (?, ?, ?,?, ?, ?,?)', ['C00001', 'El Corte Ingles s.a.', 'ITEM003', 'DESCRIPCION ITEM003', 77,34, '2012-06-21'],
//                        nullDataHandler, killTransaction);

//                    transaction.executeSql('DELETE  FROM AX_PRECIOS', [], nullDataHandler, killTransaction);

//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00001', 'ITEM001', 12.3],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00001', 'ITEM002', 4.5],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00001', 'ITEM003', 3],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00001', 'ITEM004', 345],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00001', 'ITEM005', 12.67],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00002', 'ITEM001', 16.3],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00002', 'ITEM002', 7.5],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00002', 'ITEM003', 8],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00002', 'ITEM004', 389],
//                        nullDataHandler, killTransaction);
//                    transaction.executeSql('INSERT INTO AX_PRECIOS VALUES  (?, ?, ?)', ['C00002', 'ITEM005', 17.77],
//                        nullDataHandler, killTransaction);
                  }
            );

        } catch (e) {
            errorfunction(e);
            return;
        }
        successfunction();
    }


  

//---------------------------------------------------------------------------------
// Callbacks
//---------------------------------------------------------------------------------

// Cancel.la la transacció
function killTransaction(transaction, error) {
    alert('Oops.  Error was ' + error.message + ' (Code ' + error.code + ')'); 
    return true;  
}

function errorHandler(transaction, error) {
 
    alert('Error  ' + error.message + ' (Codigo ' + error.code + ')');

    return true;
}

function nullDataHandler(transaction, results) {
}

