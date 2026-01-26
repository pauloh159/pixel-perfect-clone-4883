
import https from 'https';

const url = 'https://cms.nazaresantosestetica.com.br/wp-json/wp/v2/eventos?status=publish&per_page=10&_embed';

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.error('Erro ao fazer parse do JSON:', e.message);
      console.log('Dados recebidos:', data);
    }
  });

}).on('error', (err) => {
  console.error('Erro na requisição:', err.message);
});
