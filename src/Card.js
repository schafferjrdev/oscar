import React, { useState, useEffect } from "react";

import axios from "axios";

import "./App.scss";
import { Checkbox, Rate, Tag, Tooltip, Popover, Card, Divider } from "antd";

import Icon from "./Icon";
import { LoadingOutlined } from "@ant-design/icons";
import { CATEGORIES } from "./constants";

const { Meta } = Card;

const MovieCard = ({ handleRate, handleCheck, data, index }) => {
  const [omdb, setOmdb] = useState(null);

  const Categories = ({ list = [] }) => {
    return (
      <div className='list-category'>
        {list.map((l, i) => (
          <Tag
            key={`tag_${i}`}
            color={CATEGORIES[l].color}
            className='tag-category'
          >
            {CATEGORIES[l].title}
          </Tag>
        ))}
      </div>
    );
  };

  const getOMDB = async (uuid) => {
    axios
      .get(`https://www.omdbapi.com/?apikey=81750ce2&i=${uuid?.split("/")[4]}`)
      .then(function (response) {
        // handle success
        setOmdb(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getOMDB(data?.movie.imdb);
  }, [data]);

  return (
    <Card
      cover={
        omdb?.Poster ? (
          <img
            onClick={() =>
              handleCheck(index, { target: { checked: !data?.watched } })
            }
            className='poster-image'
            alt='movie_poster'
            src={omdb?.Poster}
            title='Clique para marcar que viu'
          />
        ) : (
          <LoadingOutlined />
        )
      }
      loading={!omdb}
      style={{ width: "100%" }}
      className={`movie-card${data?.watched ? " checked" : ""}`}
      actions={
        // data?.subtitle
        //   ? [
        //       <Icon type={data?.platform.name} url={data?.platform.url} />,
        //       <Icon
        //         type={data?.subtitle ? "legenda" : null}
        //         url={data?.subtitle}
        //       />,
        //     ]
        //   : [<Icon type={data?.platform.name} url={data?.platform.url} />]
        data?.platform.url
          ? [<Icon type={data?.platform.name} url={data?.platform.url} />]
          : null
      }
    >
      <Meta
        title={
          <span className='watched'>
            <a
              href={data?.movie.imdb}
              target='_blank'
              rel='noreferrer'
              title='Ir ao imdb'
            >
              <b>{data?.movie.name}</b>
            </a>

            <Tooltip title='Sua nota pessoal' placement='right'>
              <span>
                <Rate
                  allowHalf
                  allowClear
                  onChange={(val) => handleRate(index, val)}
                  value={data?.rate}
                />
              </span>
            </Tooltip>
          </span>
        }
        description={`${omdb?.Title} • ${omdb?.Year} • ${omdb?.Runtime}`}
      />
      <div>
        <div className='movie-plot'>
          <p>
            <b>Sinopse</b>
            {omdb?.Plot}
          </p>
          <p>
            <b>Elenco</b>
            {omdb?.Actors}
          </p>
        </div>
        <Divider />

        <Popover
          title='Indicações'
          content={<Categories list={data?.category} />}
          placement='topRight'
          className='movie-indications'
        >
          <span className='nominees-count'>
            Indicações: {data?.category?.length}
          </span>

          {data?.category && (
            <Tag
              color={CATEGORIES[data?.category[0]]?.color}
              className='tag-major'
            >
              {CATEGORIES[data?.category[0]]?.title}
            </Tag>
          )}
        </Popover>
      </div>
      <div className={`movie-checker${data?.watched ? " watch-checked" : ""}`}>
        <Checkbox
          onChange={(e) => handleCheck(index, e)}
          checked={data?.watched}
          className='watch-checkbox'
        >
          {data?.watched ? null : "Já viu?"}
        </Checkbox>
      </div>
    </Card>
  );
};

export default React.memo(MovieCard);
