const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/swiggy', async (req, res) => {
  try {
    const response = await axios.post(
      'https://www.swiggy.com/dapi/restaurants/list/update',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Origin': 'https://www.swiggy.com',
          'Referer': 'https://www.swiggy.com/restaurants',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
          '__fetch_req__': 'true',
          'cookie': '__SW=VNOyVLjWOOT-ajSiQYvi2ZCn8YWb9K7s; _device_id=dd571269-ecb7-7f74-35d8-35b8a88dd127; userLocation={%22lat%22:%2221.99740%22,%22lng%22:%2279.00110%22,%22address%22:%22%22,%22area%22:%22%22,%22showUserDefaultAddressHint%22:false}; fontsLoaded=1; _gcl_au=1.1.1520884617.1750673531; _gid=GA1.2.2051632228.1750673533; _swuid=dd571269-ecb7-7f74-35d8-35b8a88dd127; _ga_X3K3CELKLV=GS2.1.s1750674023$o1$g1$t1750674500$j40$l0$h0; _guest_tid=54d2dbda-c597-44e6-97ed-e5472de187f3; _sid=ld28bd51-d1dc-4a22-9c69-a0c7fa3b3e47; _ga=GA1.1.1870482168.1750673533; _ga_YE38MFJRBZ=GS2.1.s1750841541$o13$g1$t1750843556$j7$l0$h0; _ga_34JYJ0BCRN=GS2.1.s1750841541$o13$g1$t1750843556$j7$l0$h0'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Swiggy API call failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Body:', error.response.data);
    }
    res.status(500).json({ error: 'Swiggy request failed', message: error.message });
  }
});

app.listen(5000, () => console.log('Proxy running on http://localhost:5000'));
