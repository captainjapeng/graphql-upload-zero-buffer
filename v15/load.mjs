import autocannon from 'autocannon'
import FormData from 'form-data'

const data = new FormData()
data.append('operations', JSON.stringify({
  variables: { input: { file: null } },
  query: `mutation ($input: TestInput!) { testUpload(input: $input) }`,
}))
data.append('map', JSON.stringify({ "1": ["variables.input.file"] }))
data.append('1', Buffer.alloc(100))

autocannon({
  url: `http://localhost:4000`,
  headers: data.getHeaders(),
  body: data.getBuffer(),
  connections: 10,
  pipelining: 5,
  amount: 30000,
}, (err, result) => {
  if (err) console.error(err)

  const resultStr = autocannon.printResult(result)
  console.log(resultStr)
})