import './App.css'
import { useState } from 'react'
import api from './api'
import { IoIosArrowDropdownCircle } from "react-icons/io";

function App() {

  const [moeda, setMoeda] = useState('')
  const [moedaCompra, setMoedaCompra] = useState('')
  const [responseData, setResponse] = useState(0)
  const [targeCode, setTargetCode] = useState('')
  const [formatedPrice, setFormatedPrice] = useState('')

  const currencies = [
    { code: "AED", name: "UAE Dirham", country: "ar-AE" },
    { code: "AFN", name: "Afghan Afghani", country: "fa-AF" },
    { code: "ALL", name: "Albanian Lek", country: "sq-AL" },
    { code: "AMD", name: "Armenian Dram", country: "hy-AM" },
    { code: "ANG", name: "Netherlands Antillian Guilder", country: "nl-AN" },
    { code: "AOA", name: "Angolan Kwanza", country: "pt-AO" },
    { code: "ARS", name: "Argentine Peso", country: "es-AR" },
    { code: "AUD", name: "Australian Dollar", country: "en-AU" },
    { code: "AWG", name: "Aruban Florin", country: "nl-AW" },
    { code: "AZN", name: "Azerbaijani Manat", country: "az-AZ" },
    { code: "BAM", name: "Bosnia and Herzegovina Mark", country: "bs-BA" },
    { code: "BBD", name: "Barbados Dollar", country: "en-BB" },
    { code: "BDT", name: "Bangladeshi Taka", country: "bn-BD" },
    { code: "BGN", name: "Bulgarian Lev", country: "bg-BG" },
    { code: "BHD", name: "Bahraini Dinar", country: "ar-BH" },
    { code: "BIF", name: "Burundian Franc", country: "fr-BI" },
    { code: "BMD", name: "Bermudian Dollar", country: "en-BM" },
    { code: "BND", name: "Brunei Dollar", country: "ms-BN" },
    { code: "BOB", name: "Bolivian Boliviano", country: "es-BO" },
    { code: "BRL", name: "Brazilian Real", country: "pt-BR" },
    { code: "BSD", name: "Bahamian Dollar", country: "en-BS" },
    { code: "BTN", name: "Bhutanese Ngultrum", country: "dz-BT" },
    { code: "BWP", name: "Botswana Pula", country: "en-BW" },
    { code: "BYN", name: "Belarusian Ruble", country: "be-BY" },
    { code: "BZD", name: "Belize Dollar", country: "en-BZ" },
    { code: "CAD", name: "Canadian Dollar", country: "en-CA" },
    { code: "CDF", name: "Congolese Franc", country: "fr-CD" },
    { code: "CHF", name: "Swiss Franc", country: "de-CH" },
    { code: "CLP", name: "Chilean Peso", country: "es-CL" },
    { code: "CNY", name: "Chinese Renminbi", country: "zh-CN" },
    { code: "COP", name: "Colombian Peso", country: "es-CO" },
    { code: "CRC", name: "Costa Rican Colon", country: "es-CR" },
    { code: "CUP", name: "Cuban Peso", country: "es-CU" },
    { code: "CVE", name: "Cape Verdean Escudo", country: "pt-CV" },
    { code: "CZK", name: "Czech Koruna", country: "cs-CZ" },
    { code: "DJF", name: "Djiboutian Franc", country: "fr-DJ" },
    { code: "DKK", name: "Danish Krone", country: "da-DK" },
    { code: "DOP", name: "Dominican Peso", country: "es-DO" },
    { code: "DZD", name: "Algerian Dinar", country: "ar-DZ" },
    { code: "EGP", name: "Egyptian Pound", country: "ar-EG" },
    { code: "ERN", name: "Eritrean Nakfa", country: "ti-ER" },
    { code: "ETB", name: "Ethiopian Birr", country: "am-ET" },
    { code: "EUR", name: "Euro", country: "eu-EU" },
    { code: "FJD", name: "Fiji Dollar", country: "en-FJ" },
    { code: "FKP", name: "Falkland Islands Pound", country: "en-FK" },
    { code: "FOK", name: "Faroese Króna", country: "fo-FO" },
    { code: "GBP", name: "Pound Sterling", country: "en-GB" },
    { code: "GEL", name: "Georgian Lari", country: "ka-GE" },
    { code: "GGP", name: "Guernsey Pound", country: "en-GG" },
    { code: "GHS", name: "Ghanaian Cedi", country: "en-GH" },
    { code: "GIP", name: "Gibraltar Pound", country: "en-GI" },
    { code: "GMD", name: "Gambian Dalasi", country: "en-GM" },
    { code: "GNF", name: "Guinean Franc", country: "fr-GN" },
    { code: "GTQ", name: "Guatemalan Quetzal", country: "es-GT" },
    { code: "GYD", name: "Guyanese Dollar", country: "en-GY" },
    { code: "HKD", name: "Hong Kong Dollar", country: "zh-HK" },
    { code: "HNL", name: "Honduran Lempira", country: "es-HN" },
    { code: "HRK", name: "Croatian Kuna", country: "hr-HR" },
    { code: "HTG", name: "Haitian Gourde", country: "fr-HT" },
    { code: "HUF", name: "Hungarian Forint", country: "hu-HU" },
    { code: "IDR", name: "Indonesian Rupiah", country: "id-ID" },
    { code: "ILS", name: "Israeli New Shekel", country: "he-IL" },
    { code: "INR", name: "Indian Rupee", country: "hi-IN" },
    { code: "IQD", name: "Iraqi Dinar", country: "ar-IQ" },
    { code: "IRR", name: "Iranian Rial", country: "fa-IR" },
    { code: "ISK", name: "Icelandic Króna", country: "is-IS" },
    { code: "JMD", name: "Jamaican Dollar", country: "en-JM" },
    { code: "JOD", name: "Jordanian Dinar", country: "ar-JO" },
    { code: "JPY", name: "Japanese Yen", country: "ja-JP" },
    { code: "KES", name: "Kenyan Shilling", country: "en-KE" },
    { code: "KGS", name: "Kyrgyzstani Som", country: "ky-KG" },
    { code: "KHR", name: "Cambodian Riel", country: "km-KH" },
    {code: "USD", name: "United States Dollar", country: "en-US"},
  ];


  console.log(targeCode)
  

  async function handleConvertation(): Promise<void> {
    try {
      const response = await api.get(`/pair/${moeda}/${moedaCompra}`);
      const conversionRate = response.data.conversion_rate;
      const targetCode = response.data.target_code;
  
      const currency = currencies.find(c => c.code === targetCode);
  
      if (currency) {
        const country = currency.country;
        const nameCoin = currency.name;
  
        const formattedPrice = `${nameCoin}: ${Intl.NumberFormat(country, { 
          style: 'currency', 
          currency: targetCode 
        }).format(parseFloat(conversionRate.toFixed(2)))}`;
  
        setResponse(conversionRate);
        setTargetCode(targetCode);
        setFormatedPrice(formattedPrice); 
        console.log(formattedPrice);
      } else {
        console.log('Currency not found');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
  

  return (
    <section className='container'>
       <div className='container-filha'>
        <h1 className='container-title'>Insira a sua moeda atual</h1>
        <div className="select-container">
        <select 
          className="select-moeda" 
          value={moeda} 
          onChange={(e) => setMoeda(e.target.value)}
          >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code}
            </option>
          ))}
        </select>
        <IoIosArrowDropdownCircle className="icon-arrow" />
        </div>
        <h1 className='container-title'>Insira a moeda que deseja comprar</h1>
        <div className='select-container'>
        <select className='select-moeda' value={moedaCompra} onChange={element => setMoedaCompra(element.target.value)}>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code}
            </option>
          ))}
        </select>
        <IoIosArrowDropdownCircle className="icon-arrow" />
        </div>
          <button className='btn-converter' onClick={handleConvertation}>Converter</button>
       </div>
      {!responseData ? <div className='container-filha resultado'>
        <p className='loading'>Taxa de conversão</p>
      </div> : (
        <div className='container-filha resultado'>
            <h1 className='container-title resultado'>Taxa de conversão</h1>
            <p className='conversao'>{formatedPrice}</p>
        </div>
      )}
    </section>
  )
}

export default App
