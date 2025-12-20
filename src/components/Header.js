import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";

function Header({
  openSettings,
  handleSearch,
  handleFocus,
  search,
  showModal,
}) {
  const handleSettingsOpen = () => {
    openSettings(true);
  };

  return (
    <>
      <header className='oscar-header'>
        <div className='header-action'>
          <Input
            bordered={false}
            className={`search-box ${search?.length > 0 && "opened"}`}
            onChange={handleSearch}
            onFocus={handleFocus}
            value={search}
            prefix={
              <span className='material-icons-outlined header-button'>
                search
              </span>
            }
            suffix={
              <span
                className={`material-icons-outlined header-button ${
                  search?.length === 0 && "hidden"
                }`}
                onClick={handleFocus}
              >
                close
              </span>
            }
          />

          <span
            onClick={showModal}
            className='material-icons-outlined header-button'
          >
            {"add"}
          </span>

          <UserOutlined
            className='header-button'
            onClick={handleSettingsOpen}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
