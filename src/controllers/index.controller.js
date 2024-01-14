const { query } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
    
    /* host: '147.135.6.159',//process.env.DB_HOST,
    user: 'munihuac_stalin',//process.env.DB_USER,
    password: 'rktUE6Z6g8F&',//process.env.DB_PASS,
    database: 'munihuac_sayan',//process.env.DB,
    port: 5432, */

    host: '51.161.12.44',//process.env.DB_HOST,
    user: 'demohw_rleon',//process.env.DB_USER,
    password: '=zj79uHwcPl8',//process.env.DB_PASS,
    database: 'demohw_sayan',//process.env.DB,
    port: 5432
})

pool.connect(function(error){
    if (error) {
        throw error;
    }else{
        console.log("Conexion a la bd fue exitosa")
    }
});

var controller = {

    

    /* const getLenguaje = (nombres)=>{
        const table = 'gat.rn0001'
        return pool.po.insert({

        })

    };




 */

    get:async(req,res)=>{
        try {
            const {nombre}= req.params;
           
            const response = await pool.query('SELECT nombre FROM gat.datos WHERE nombre=$1',[nombre] );
            return res.status(200).json(response.rows);
        } catch (error) {
            return res.status(500).json({
                msg: ' No hay registros para el código '
            })
        }
    },

    //OBTENER CREDENCIALES
    getDatos:async(req,res)=>{
        try {
            const {contrib}= req.params;
            const estado ='A';
            const response = await pool.query('SELECT contrib,ap_paterno,ap_materno,nombres,direcc FROM gat.rn0001 WHERE id=$1 and contrib =$2 ',[estado, contrib]);
            return res.status(200).json(response.rows);
        } catch (error) {
            return res.status(500).json({
                msg: ' No hay registros para el código '+ contrib
            })
        }
    },



    //DETALLES DE PREDIOS
    getPredioDetails: async(req, res)=>{
        try {
            const { contrib} = req.params;
            const estado = 'A';
            const tributo = '001';
            const { anio } = req.params;
            
            const response = await pool.query('SELECT id,tributo,contrib,peini,aini,vdeuda,vderemi,vmora,vrecgo,vinte,votros,vabon,SUM(vmora + vrecgo + vinte + COALESCE(votros, 0.00)) AS sobretasas, SUM(vdeuda + vderemi + vmora + vrecgo + vinte+ COALESCE(votros, 0.00)) AS TOTAL FROM gat.rn0005 WHERE id= $1 and aini = $2 and contrib= $3 and tributo = $4 GROUP BY id,tributo,contrib,peini,aini,vdeuda,vderemi,vmora,vrecgo,vinte,votros,vabon ORDER BY peini ASC',[estado,anio,contrib,tributo]);
            
            return res.status(200).json(response.rows);

        } catch (error) {
            return res.status(500).json({
                msg: 'No hay registros para este codigo : '+ contrib
            })
        }

    },

    getTotales:async(req,res)=>{
        try {
            const { contrib } = req.params;
            const estado ='A';
            const tributo = '001';
            const { anio } = req.params;

            const response = await pool.query('SELECT id,contrib,aini,tributo,SUM (vdeuda + vderemi + vmora + vrecgo + vinte+ COALESCE(votros, 0.00)) AS TOTAL FROM gat.rn0005 WHERE id =$1 and contrib =$2 and tributo=$3 and aini=$4 GROUP BY id,contrib,aini,tributo',[estado,contrib,tributo,anio])

            return res.status(200).json(response.rows)

        } catch (error) {
            return res.status(500).json({
                msg: 'este codigo no es valido'
            })
        }
    },


    getPredios: async (req, res) => {

        try {
            const { contrib } = req.params;
            const estado = 'A';
            const tributo = '001';

            const response = await pool.query('SELECT id,contrib,peini,aini,vdeuda,vderemi,vabon FROM gat.rn0005 WHERE id= $1 and contrib = $2 and tributo = $3 ', [estado, contrib, tributo]);
            //console.log(response);

            return res.status(200).json(response.rows);

            
        } catch (error) {
            return res.status(500).json({
                msg: 'este codigo no es válido'
            })
        }
    },


    //PREDIOS - SOLO MUESTRA LOS AÑOS
    getAnios: async(req,res)=>{

        try {
            
            const { contrib } = req.params;
            const { claveWeb } = req.params;
            const estado = 'A';
            const tributo = '001';

            
            const response = await pool.query('SELECT id,contrib,tributo,aini,vdeuda,vabon,COUNT(*)cantidad,SUM (vdeuda + vderemi + vmora + vrecgo + vinte+ COALESCE(votros, 0.00)) AS TOTAL FROM gat.rn0005 WHERE contrib = $1 and id = $2 and tributo = $3 and clave_web = $4 GROUP BY id,contrib,tributo,aini,vdeuda,vabon ORDER BY aini DESC;',[contrib,estado,tributo,claveWeb]);

            return res.status(200).json(response.rows);

        } catch (error) {

            
            return res.status(200).json({
                msg : 'No se registran deudas para el usuario ingresado'
            })
        }

    },


    getTotal: async(req,res)=>{

        try {
            const { contrib } = req.params;
            const { claveWeb } = req.params;
            const estado = 'A';
            const tributo = '001';

            const response = await pool.query('SELECT id,contrib,tributo,SUM (vdeuda + vderemi + vmora + vrecgo + vinte+ COALESCE(votros, 0.00)) AS TOTAL FROM gat.rn0005 WHERE id =$1 and contrib =$2 and tributo=$3 and clave_web=$4 GROUP BY id,contrib,tributo', [estado,contrib,tributo,claveWeb]);

            return res.status(200).json(response.rows);

        } catch (error) {
            const { contrib } = req.params;
            return res.status(200).json({
                msg : 'No se registran deudas para el usuario ingresado ' + contrib
            })
        }

    }

}


module.exports = controller;


