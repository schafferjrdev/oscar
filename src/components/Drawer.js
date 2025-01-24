import React from "react";
import "./App.scss";
import { Drawer as AntdDrawer, Rate, Popover, Tag } from "antd";
import Icon from "./Icon";
import Checkwatch from "./Checkwatch";
import { CloseOutlined } from "@ant-design/icons";
import Down from "../icons/Down";
import { CATEGORIES } from "../utils/constants";
import { nomination_plural, translate } from "../utils/functions";

function Drawer({ info, handleCheck, handleRate, open, onClose }) {
  const { data, tmdb, omdb, index } = info;

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

  return (
    <AntdDrawer
      placement='bottom'
      onClose={onClose}
      closable={false}
      open={open}
    >
      <div className='movie-details'>
        <div className='drawer-backdrop mobile'>
          <div className='drawer-actions'>
            <Down onClick={(e) => onClose(e)} alt='Icon Caret Down' />
          </div>
          <div className='backdrop-drawer-image'></div>
          <img
            className='drawer-image'
            alt='movie_poster'
            src={
              !!tmdb?.backdrop_path
                ? `https://image.tmdb.org/t/p/original${tmdb?.backdrop_path}`
                : omdb?.Poster
            }
          />

          <div className='drawer-header'>
            <p className='drawer-name'>
              <span>
                <b className='drawer-main'>{data?.movie?.name}</b>
                <span className='drawer-sub'>{omdb?.Year}</span>
              </span>
              <span>
                <i className='drawer-sub'>{omdb?.Title}</i>
              </span>
            </p>
          </div>
          <div className='banner-information'>
            <div className='banner-upper'>
              <p className='subtitle-actions'>
                <Rate
                  id='banner-stars-mobile'
                  allowHalf
                  allowClear
                  onChange={(val) =>
                    handleRate(index, val, "banner-stars-mobile")
                  }
                  value={data?.rate}
                />
                <Checkwatch
                  handleCheck={handleCheck}
                  index={index}
                  value={data?.watched}
                  className='checkwatch-card-drawer round-button'
                />
              </p>
              <p className='banner-subtitle'>
                {omdb?.Runtime} • {omdb?.Genre}
              </p>
            </div>
            <div className='movie-plot'>
              <p>
                <span className='banner-body'>{tmdb?.overview}</span>
              </p>
              {data?.platform?.length > 0 ? (
                <>
                  <hr />
                  <p className='banner-topic'>ASSISTA AGORA</p>
                  <div>
                    {data?.platform.map((p) => (
                      <Icon
                        key={p.name}
                        type={p.name}
                        url={p.url}
                        debut={p?.debut}
                      />
                    ))}
                  </div>
                </>
              ) : null}
              <hr />
              <div>
                <p className='banner-topic'>ELENCO & EQUIPE</p>
                <p>
                  <b>Diretor</b>
                  <span className='banner-body'>{omdb?.Director}</span>
                </p>
                <p>
                  <b>Roteiristas</b>
                  <span className='banner-body'>{omdb?.Writer}</span>
                </p>
                <p>
                  <b>Elenco</b>
                  <span className='banner-body'>{omdb?.Actors}</span>
                </p>

                <hr />
                <p className='banner-topic awards'>
                  <span>PRÊMIOS & INDICAÇÕES</span>
                  <Popover
                    title='Indicações'
                    content={<Categories list={data?.category} />}
                    placement='left'
                    className='movie-indications'
                  >
                    {data?.category && (
                      <Tag
                        color={CATEGORIES[data?.category[0]]?.color}
                        className='tag-major'
                      >
                        {CATEGORIES[data?.category[0]]?.title}
                      </Tag>
                    )}
                  </Popover>
                </p>
                <div>
                  <p>
                    <b>Oscar</b>
                    <span className='banner-body'>
                      {nomination_plural(data?.category?.length)}
                    </span>
                    {data?.nominees?.map((n) => (
                      <span className='banner-body'>{n}</span>
                    ))}
                  </p>
                  <p>
                    <b>Premiações</b>
                    <span className='banner-body'>
                      {translate(omdb?.Awards)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='movie-banner desktop'>
          <img
            className='banner-image'
            alt='movie_poster'
            src={
              !!tmdb?.backdrop_path
                ? `https://image.tmdb.org/t/p/original${tmdb?.backdrop_path}`
                : omdb?.Poster
            }
          />
          <div className='banner-backdrop'>
            <div className='banner-content'>
              <img
                className='banner-poster-image'
                alt='movie_poster'
                src={
                  !!tmdb?.poster_path
                    ? `https://image.tmdb.org/t/p/original${tmdb?.poster_path}`
                    : omdb?.Poster
                }
              />
              <div className='banner-information'>
                <div className='float-buttons'>
                  <Checkwatch
                    handleCheck={handleCheck}
                    index={index}
                    value={data?.watched}
                    className='round-button'
                  />
                  <CloseOutlined
                    className='close-button round-button'
                    onClick={(e) => onClose(e)}
                  />
                </div>
                <div className='banner-upper'>
                  <span className='banner-title'>
                    <span className='banner-name'>{data?.movie?.name}</span>

                    <span id='banner-stars-desktop'>
                      <Rate
                        allowHalf
                        allowClear
                        onChange={(val) =>
                          handleRate(index, val, "banner-stars-desktop")
                        }
                        value={data?.rate}
                      />
                    </span>
                  </span>
                  <span className='banner-subtitle'>
                    {omdb?.Title} • {omdb?.Year} • {omdb?.Runtime} •{" "}
                    {omdb?.Genre}
                  </span>
                </div>
                <div className='movie-plot'>
                  <p>
                    <span className='banner-body'>{tmdb?.overview}</span>
                  </p>
                  {data?.platform?.length > 0 ? (
                    <>
                      <hr />
                      <p className='banner-topic'>ASSISTA AGORA</p>
                      <div>
                        {data?.platform.map((p) => (
                          <Icon type={p.name} url={p.url} debut={p?.debut} />
                        ))}
                      </div>
                    </>
                  ) : null}
                  <hr />
                  <div>
                    <p className='banner-topic'>ELENCO & EQUIPE</p>
                    <p>
                      <b>Diretor</b>
                      <span className='banner-body'>{omdb?.Director}</span>
                    </p>
                    <p>
                      <b>Roteiristas</b>
                      <span className='banner-body'>{omdb?.Writer}</span>
                    </p>
                    <p>
                      <b>Elenco</b>
                      <span className='banner-body'>{omdb?.Actors}</span>
                    </p>

                    <hr />
                    <p className='banner-topic awards'>
                      <span>PRÊMIOS & INDICAÇÕES</span>

                      {/* <Popover
                        title='Indicações'
                        content={<Categories list={data?.category} />}
                        placement='left'
                        className='movie-indications'
                      >
                        {data?.category && (
                          <Tag
                            color={CATEGORIES[data?.category[0]]?.color}
                            className='tag-major'
                          >
                            {CATEGORIES[data?.category[0]]?.title}
                          </Tag>
                        )}
                      </Popover> */}
                    </p>
                    <div className='awards-columns'>
                      <div>
                        <p>
                          <b>Oscar</b>
                          <span className='banner-body'>
                            {nomination_plural(data?.category?.length)}
                          </span>
                          {data?.nominees?.map((n) => (
                            <span className='banner-body'>{n}</span>
                          ))}
                        </p>
                        <p>
                          <b>Premiações</b>
                          <span className='banner-body'>
                            {translate(omdb?.Awards)}
                          </span>
                        </p>
                      </div>
                      <Categories list={data?.category} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AntdDrawer>
  );
}

export default Drawer;
