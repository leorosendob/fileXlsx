const axios = require('axios')
const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')
const { put } = require('request')

const BARRAMENTO_ENDPOINT = ''
const route = '/api/v1/BankSlip/PutCancelBankSlip/'

const token = ''
const config = {
    method: 'put',
    headers: { Authorization: `Bearer ${token}` }
}

//Arquivo .xlsx a ser carregado
const file = 'teste-cancelar.xlsx'

// Readable Stream.
readXlsxFile(fs.createReadStream(file)).then((rows) => {
    rows.shift()
    for (let i = 0; i < rows.length; i ++) {
        const value = rows[i][0]
        console.log(value)
        axios({
            ...config,
            url: `${BARRAMENTO_ENDPOINT}${route}${encodeURIComponent(value)}%20`
        })
        .then(res => {
            console.log('sucesso', res?.data?.payLoad)
        })
        .catch(err => {
            console.log('erro', err?.response)
        })
    }
})
