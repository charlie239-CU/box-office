import React, { useState } from 'react';
import ShowGrid from '../components/show/ShowGrid';
import MainPageLayout from '../components/MainPageLayout';
import ActorGrid from '../components/actor/ActorGrid';

import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');
  const isShowSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(r => {
      setResult(r);
      console.log(r);
    });
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onkeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };
  console.log(searchOption);

  const renderResult = () => {
    if (result && result.length === 0) {
      return <div>No result Found</div>;
    }
    if (result && result.length > 0) {
      return result[0].show ? (
        <ShowGrid data={result} />
      ) : (
        <ActorGrid data={result} />
      );
    }

    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        onKeyDown={onkeyDown}
        value={input}
      />
      <div>
        <label htmlFor="show-search">
          Shows
          <input
            type="radio"
            id="show-search"
            value="shows"
            onChange={onRadioChange}
            checked={isShowSearch}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            type="radio"
            id="actors-search"
            value="people"
            onChange={onRadioChange}
            checked={!isShowSearch}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
