import React from "react";
import "./App.scss";
import { Drawer as AntdDrawer, Rate, Popover, Tag } from "antd";
import Icon from "./Icon";
import {
  CloseOutlined,
  EyeFilled,
  EyeInvisibleFilled,
} from "@ant-design/icons";
import CaretDown from "./icons/CaretDown.svg";
import { CATEGORIES } from "./constants";

function Drawer({ movie, handleCheck, index, handleRate, open, onClose }) {
  const { data, tmdb, omdb } = movie;

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
            <span
              className={`checkbox-watch ${data?.watched ? "" : "not-seen"}`}
              onClick={() => handleCheck(index)}
            >
              {data?.watched ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <img
              onClick={(e) => onClose(e)}
              src={CaretDown}
              alt='Icon Caret Down'
            />
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
            <Rate
              allowHalf
              allowClear
              onChange={(val) => handleRate(index, val)}
              value={data?.rate}
            />
          </div>
          <div className='banner-information'>
            <div className='banner-upper'>
              <p className='banner-subtitle'>
                {omdb?.Runtime} • {omdb?.Genre}
              </p>
            </div>
            <div className='movie-plot'>
              <p>
                <span className='banner-body'>{tmdb?.overview}</span>
              </p>
              {data?.platform?.url ? (
                <>
                  <hr />
                  <p className='banner-topic'>WATCH NOW</p>

                  <Icon type={data?.platform?.name} url={data?.platform?.url} />
                </>
              ) : null}
              <hr />
              <div>
                <p className='banner-topic'>CAST & CREW</p>
                <p>
                  <b>Director</b>
                  <span className='banner-body'>{omdb?.Director}</span>
                </p>
                <p>
                  <b>Writers</b>
                  <span className='banner-body'>{omdb?.Writer}</span>
                </p>
                <p>
                  <b>Stars</b>
                  <span className='banner-body'>{omdb?.Actors}</span>
                </p>

                <hr />
                <p className='banner-topic awards'>
                  <span>AWARDS & NOMANATIONS</span>
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
                <p>
                  <b>Oscar</b>
                  <span className='banner-body'>
                    {data?.category?.length} indicações
                  </span>
                </p>
                <p>
                  <b>Premiações</b>
                  <span className='banner-body'>{omdb?.Awards}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='movie-banner desktop'>
          <CloseOutlined className='close-button' onClick={(e) => onClose(e)} />

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
              <span
                className={`checkbox-watch ${data?.watched ? "" : "not-seen"}`}
                onClick={() => handleCheck(index)}
              >
                {data?.watched ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
              <div className='banner-information'>
                <div className='banner-upper'>
                  <span className='banner-title'>
                    <span className='banner-name'>{data?.movie?.name}</span>
                    <span>
                      <Rate
                        allowHalf
                        allowClear
                        onChange={(val) => handleRate(index, val)}
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
                  {data?.platform?.url ? (
                    <>
                      <hr />
                      <p className='banner-topic'>WATCH NOW</p>

                      <Icon
                        type={data?.platform?.name}
                        url={data?.platform?.url}
                      />
                    </>
                  ) : null}
                  <hr />
                  <div>
                    <p className='banner-topic'>CAST & CREW</p>
                    <p>
                      <b>Director</b>
                      <span className='banner-body'>{omdb?.Director}</span>
                    </p>
                    <p>
                      <b>Writers</b>
                      <span className='banner-body'>{omdb?.Writer}</span>
                    </p>
                    <p>
                      <b>Stars</b>
                      <span className='banner-body'>{omdb?.Actors}</span>
                    </p>

                    <hr />
                    <p className='banner-topic awards'>
                      <span>AWARDS & NOMANATIONS</span>
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
                    <p>
                      <b>Oscar</b>
                      <span className='banner-body'>
                        {data?.category?.length} indicações
                      </span>
                    </p>
                    <p>
                      <b>Premiações</b>
                      <span className='banner-body'>{omdb?.Awards}</span>
                    </p>
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
