const useGetApi = (method, uri, state1, history) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState('loading');
  const [code, setCode] = useState(0);
  // setAccessToken(localStorage.getItem('accessToken'));

  useEffect(async () => {
    const getData = async () => {
      try {
        let { data } = await axios[method](serverUrl + uri);
        console.log(data);
        if (data.result_body) {
          setData(data.result_body);
        }
        setCode(data.result_code);
        setLoading('finished');
      } catch (err) {
        // console.log('get!');
        // console.log(err);
        // alert(err);
        // clearStorage();
        // history.push('/');
      }
    };
    getData();
  }, [state1]);
  return [data, code, loading];
};

const useGetCardApi = uri => {
  const [update, setUpdate] = useState(false);
  const [tagList, setTagList] = useState([]);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const getCard = async () => {
      let { data } = await axios.get(serverUrl + uri);

      let { result_body } = data;

      if (result_body.length > 0) {
        const obj = {};
        const tags = [];
        const cards = [];
        result_body
          .sort((a, b) => a.id - b.id)
          .map(el => {
            let cardObj = {
              id: el.id,
              name: el.name,
              tagValue: el.tagValue,
              memberNames: el.memberNames,
              labels: el.labels,
              createDate: el.createDate,
              updateDate: el.updateDate,
            };

            if (!obj[el.tagValue]) {
              obj[el.tagValue] = [cardObj];
            } else {
              obj[el.tagValue].push(cardObj);
            }
          });

        for (let i in obj) {
          tags.push(i);
          cards.push(obj[i]);
        }

        setTagList(tags);
        setCardList(cards);
      } else {
        setTagList([]);
        setCardList([]);
      }
    };
    getCard();
  }, [update]);

  return [tagList, cardList, setUpdate];
};
