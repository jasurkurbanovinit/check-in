import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';
import { TextRow } from './components/TextRow'
const sections = [
  { id: 1, sectionName: "Status" },
  { id: 2, sectionName: "Passport Number" },
  { id: 3, sectionName: "First Name" },
  { id: 4, sectionName: "Last Name" },
  { id: 5, sectionName: "Patronymic" },
  { id: 6, sectionName: "Birth Date" },
  { id: 7, sectionName: "Birth Place" },
  { id: 8, sectionName: "Birth Country" },
  { id: 9, sectionName: "Nationality" },
  { id: 10, sectionName: "Citizenship" },
  { id: 11, sectionName: "Document Issue Place" },
  { id: 12, sectionName: "Issue Date" },
  { id: 13, sectionName: "Expiry Date" },
  { id: 14, sectionName: "Permanent address" },
  { id: 15, sectionName: "Temporary address" },
]
function App() {
  const [address, setAddress] = useState('')
  const [passportData, setPassportData] = useState('')
  const [tempAddress, setTempAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const { document, name_latin, name_engl, surname_latin,
    surname_engl, patronym_latin, patronym_engl, birth_date,
    birth_place, birth_country, nationality, citizenship,
    doc_give_place, date_begin_document, date_end_document, } = passportData

  const { paddress } = address;
  const { pAddress } = tempAddress;

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        let requestedData = await axios.get('http://172.16.30.52:8998/mrz/getDataUser').then(res => res.data)
        setPassportData(requestedData.data.passportData || [])
        setAddress(requestedData.data.address || [])
        setTempAddress(requestedData.data.tempAddress || [])
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()

  }, [])
  return (
    <>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
          <div className="App">
            <div className="innerContent">
              <TextRow sectionName={'Status'} sectionValue={'Valid'} />
              <TextRow sectionName={'Passport Number'} sectionValue={document} />
              <TextRow sectionName={'First Name'} sectionValue={name_latin || name_engl} />
              <TextRow sectionName={'Last Name'} sectionValue={surname_latin || surname_engl} />
              <TextRow sectionName={'Patronymic'} sectionValue={patronym_latin || patronym_engl} />
              <TextRow sectionName={'Birth Date'} sectionValue={birth_date} />
              <TextRow sectionName={'Birth Place'} sectionValue={birth_place} />
              <TextRow sectionName={'Birth Country'} sectionValue={birth_country} />
              <TextRow sectionName={'Nationality'} sectionValue={nationality} />
              <TextRow sectionName={'Citizenship'} sectionValue={citizenship} />
              <TextRow sectionName={'Document Issue Place'} sectionValue={doc_give_place} />
              <TextRow sectionName={'Issue Date'} sectionValue={date_begin_document} />
              <TextRow sectionName={'Expiry Date'} sectionValue={date_end_document} />
              <TextRow sectionName={'Permanent address'} sectionValue={paddress} />
              <TextRow sectionName={'Temporary address'} sectionValue={pAddress || 'не указано'} />

            </div>
          </div>
        )}
    </>
  );
}

export default App;
