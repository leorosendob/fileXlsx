const axios = require('axios')
const fs = require('fs')
const readXlsxFile = require('read-excel-file/node')
const { put } = require('request')

const BARRAMENTO_ENDPOINT = 'https://az-apimngbrm-eu2-prd01.azure-api.net'
const route = '/api/v1/BankSlip/PutCancelBankSlip/'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJhcGk6Ly80YzYzMGZhYS00MDc4LTQ3NTEtOWQzNi05NWVkNDM3NjNjOGEiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81NTZhYzVkNi0xZTZjLTQ5YjQtODViOS05YmRhMTYzNDU0NTYvIiwiaWF0IjoxNjQyNDU1MDA1LCJuYmYiOjE2NDI0NTUwMDUsImV4cCI6MTY0MjQ1ODkwNSwiYWlvIjoiRTJaZ1lBaVdYbmZUOWFBRjY1WHZ2MjlNM1RVbEJnQT0iLCJhcHBpZCI6IjRjNjMwZmFhLTQwNzgtNDc1MS05ZDM2LTk1ZWQ0Mzc2M2M4YSIsImFwcGlkYWNyIjoiMSIsImdyb3VwcyI6WyI2MTEyNDNkOC05OGQ2LTQ1MmMtOTc2Zi1kYmQ5Yzc4NGQzYjAiXSwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNTU2YWM1ZDYtMWU2Yy00OWI0LTg1YjktOWJkYTE2MzQ1NDU2LyIsIm9pZCI6IjU3ODA3YmM0LTI5NTQtNDZkNS05ZDE1LTdkZWUxMmZiYjdjZSIsInJoIjoiMC5BVVVBMXNWcVZXd2V0RW1GdVp2YUZqUlVWcW9QWTB4NFFGRkhuVGFWN1VOMlBJcEZBQUEuIiwic3ViIjoiNTc4MDdiYzQtMjk1NC00NmQ1LTlkMTUtN2RlZTEyZmJiN2NlIiwidGlkIjoiNTU2YWM1ZDYtMWU2Yy00OWI0LTg1YjktOWJkYTE2MzQ1NDU2IiwidXRpIjoiTXdoWnNtOHNpMEczdjJDaHl6aTRBQSIsInZlciI6IjEuMCJ9.F_CkvsBXf7mdQr45j6rpV-ZVfMIC7ktdQzbPv4W3GLo6zxmv5uM54e8brZNhTObspdiu75KNf5LQHwLDwmuuym4u_LbAhyitMcwL6NnTcGHtNQukkzc8QSmuZo8ATUAJ95JzZKpVbCMvB8tQ6u6X1Sgprf5AS0x9oS1X_La6XwQboksBQtWLdEIGRb-Sp-xSI5XbRHDlm6hhQOIQiCUkWoBM0Y7GY6aLryb5f3RTTvCLKIln52XFQP3HM3nmV0skzXfGi1shVrFF-_Qu4GmXp2DUL0DmYi8QQk_ZnVtYaIltmvAZROyr0Ws_RWgK2SG4ngN3rbGAoEWqu5wT7MaC9Q'
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