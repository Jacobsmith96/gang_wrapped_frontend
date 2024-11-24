import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import "./App.css";

let data_2016 = require("./output/output_2016.json");
let data_2017 = require("./output/output_2017.json");
let data_2018 = require("./output/output_2018.json");
let data_2019 = require("./output/output_2019.json");
let data_2020 = require("./output/output_2020.json");
let data_2021 = require("./output/output_2021.json");
let data_2022 = require("./output/output_2022.json");
let data_2023 = require("./output/output_2023.json");
let data_2024 = require("./output/output_2024.json");
let data_all = require("./output/output_all.json");

const default_url = "https://cdn.discordapp.com/embed/avatars/0.png";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getUsers() {
  let users = require("./output/users.json");
  return users;
}

function getEmojis() {
  let emojis = require("./output/emojis.json");
  return emojis;
}

function SectionComponent(props) {
  let title = props.title;
  let index = props.index;
  let data = props.data;
  let year = props.year;
  let users = props.users;
  let emojis = props.emojis;

  switch (index) {
    case 0:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
          <GroupMessagesCountDisplay year={year} data={data} />
        </div>
      );
    case 1:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
          <h3 className="text-xl font-semibold mb-4 text-center">
            These users had a few too many things to say...
          </h3>
          <BiggestYappersDisplay year={year} data={data} users={users} />
        </div>
      );
    case 2:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
          <LongestMessageDislapy year={year} data={data} users={users} />
        </div>
      );
    case 3:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
          <h3 className="text-xl font-semibold mb-4 text-center">
            These users had the most Jlessages...
          </h3>
          <JlessageDisplay year={year} data={data} users={users} />
        </div>
      );
    case 4:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Shouting out gang is a lifestyle for these users...
          </h3>
          <GangDisplay year={year} data={data} users={users} />
        </div>
      );
    case 5:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Not all Emoji are created equal...
          </h3>
          <EmojiDisplay year={year} data={data} emojis={emojis} />
        </div>
      );
    case 6:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Here were the most used reactions...
          </h3>
          <ReactionsDisplay year={year} data={data} emojis={emojis} />
        </div>
      );
    case 7:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Channels that popped off (Jon wouldn't know anything about that)...
          </h3>
          <PopularChannelsDisplay year={year} data={data} emojis={emojis} />
        </div>
      );
    default:
      return (
        <div>
          <h1>Shouldn't see this!</h1>
        </div>
      );
  }
}

function GroupMessagesCountDisplay(props) {
  let message_count = numberWithCommas(props.data.message_count.total_messages);
  let unique_users = numberWithCommas(props.data.unique_users.unique_users);
  return (
    <div>
      <p className="large-bold">
        In <b>Gang Discord</b>, a total of <b>{message_count}</b> messages were
        sent by <b>{unique_users}</b> unique users!
      </p>
    </div>
  );
}

function BiggestYappersDisplay(props) {
  // Array of objects with keys author_id and count
  let users_most_messages = props.data.users_most_messages;
  // Array of users with keys id, global_name, avatar_url
  let users = props.users;

  let users_with_counts = users_most_messages.map((item) => {
    const user = users.find((user) => user.id === item.author_id);
    if (!user) {
      return {
        global_name: "Unknown",
        count: item.count,
        avatar_url: default_url, // Add a default avatar URL if not found
        id: item.author_id,
      };
    }
    return {
      global_name: user.global_name ? user.global_name : user.name,
      count: item.count,
      avatar_url: user.avatar_url, // Add a default avatar URL if not found
      id: item.author_id,
    };
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [usersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = Object.entries(users_with_counts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      {currentUsers.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-2 p-4 bg-white/5 rounded-lg transform hover:scale-105 transition-all duration-300 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={item[1].avatar_url}
                alt={item[1].global_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item[1].global_name}</h3>
            </div>
            <div
              className="text-2xl font-bold text-purple-300 flex justify-center"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div>{item[1].count}</div>
              <div
                style={{
                  fontSize: "16px",
                }}
              >
                messages
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronLeft />
        </button>
        <div className="">
          {[
            ...Array(Math.ceil(users_with_counts.length / usersPerPage)).keys(),
          ].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => setCurrentPage(pageNumber + 1)}
              className={`${
                currentPage === pageNumber + 1
                  ? "bg-white/10"
                  : "bg-transparent"
              } p-2 rounded-full hover:bg-white/20 transition-all`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function LongestMessageDislapy(props) {
  // Array of objects with keys author_id and count
  let longest_message_data = props.data.longest_message[0];
  // Array of users with keys id, global_name, avatar_url
  let users = props.users;

  let longest_message_user = users.find(
    (user) => user.id === longest_message_data.author_id
  );
  let data =
    longest_message_user === undefined
      ? {
          global_name: "Unknown User",
          longest_message: longest_message_data.longest_message,
        }
      : {
          global_name: longest_message_user.global_name
            ? longest_message_user.global_name
            : longest_message_user.name,
          longest_message: longest_message_data.longest_message,
        };
  return (
    <div>
      <p className="large-bold" style={{ "overflow-wrap": "break-word" }}>
        {data.global_name} had the longest message with{" "}
        {data.longest_message.length} characters!
        <br />
        <br />
        <blockquote className="text-sm">{data.longest_message}</blockquote>
      </p>
    </div>
  );
}

function JlessageDisplay(props) {
  // Array of objects with keys author_id and count
  let users_most_messages = props.data.users_most_jl_words;
  // Array of users with keys id, global_name, avatar_url
  let users = props.users;

  let users_with_counts = users_most_messages.map((item) => {
    const user = users.find((user) => user.id === item.author_id);
    if (!user) {
      return {
        global_name: "Unknown",
        count: item.count,
        avatar_url: default_url, // Add a default avatar URL if not found
        id: item.author_id,
      };
    }
    return {
      global_name: user.global_name ? user.global_name : user.name,
      count: item.count,
      avatar_url: user.avatar_url, // Add a default avatar URL if not found
      id: item.author_id,
    };
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [usersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = Object.entries(users_with_counts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      {currentUsers.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-2 p-4 bg-white/5 rounded-lg transform hover:scale-105 transition-all duration-300 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={item[1].avatar_url}
                alt={item[1].global_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item[1].global_name}</h3>
            </div>
            <div
              className="text-2xl font-bold text-purple-300 flex justify-center"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div>{item[1].count}</div>
              <div
                style={{
                  fontSize: "16px",
                }}
              >
                jlessages
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronLeft />
        </button>
        <div className="">
          {[
            ...Array(Math.ceil(users_with_counts.length / usersPerPage)).keys(),
          ].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => setCurrentPage(pageNumber + 1)}
              className={`${
                currentPage === pageNumber + 1
                  ? "bg-white/10"
                  : "bg-transparent"
              } p-2 rounded-full hover:bg-white/20 transition-all`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function GangDisplay(props) {
  // Array of objects with keys author_id and count
  let users_most_messages = props.data.users_most_gang_mentions;
  // Array of users with keys id, global_name, avatar_url
  let users = props.users;

  let users_with_counts = users_most_messages.map((item) => {
    const user = users.find((user) => user.id === item.author_id);
    if (!user) {
      return {
        global_name: "Unknown",
        count: item.count,
        avatar_url: default_url, // Add a default avatar URL if not found
        id: item.author_id,
      };
    }
    return {
      global_name: user.global_name ? user.global_name : user.name,
      count: item.count,
      avatar_url: user.avatar_url, // Add a default avatar URL if not found
      id: item.author_id,
    };
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [usersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = Object.entries(users_with_counts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      {currentUsers.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-2 p-4 bg-white/5 rounded-lg transform hover:scale-105 transition-all duration-300 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={item[1].avatar_url}
                alt={item[1].global_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item[1].global_name}</h3>
            </div>
            <div
              className="text-2xl font-bold text-purple-300 flex justify-center"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div>{item[1].count}</div>
              <div
                style={{
                  fontSize: "16px",
                }}
              >
                gang mentions
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronLeft />
        </button>
        <div className="">
          {[
            ...Array(Math.ceil(users_with_counts.length / usersPerPage)).keys(),
          ].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => setCurrentPage(pageNumber + 1)}
              className={`${
                currentPage === pageNumber + 1
                  ? "bg-white/10"
                  : "bg-transparent"
              } p-2 rounded-full hover:bg-white/20 transition-all`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function EmojiDisplay(props) {
  let most_used_emojis = props.data.most_used_emojis;
  let emojis = props.emojis;

  let emojis_with_counts = most_used_emojis
    .map((item) => {
      const emoji = emojis.find(
        (emoji) =>
          emoji.emoji_id.toString() ===
          item.emoji_id.split(":")[2].split(">")[0]
      );
      if (emoji && emoji.emoji_name.toLowerCase() !== "youtube") {
        return {
          name: emoji.emoji_name,
          count: item.count,
          emoji_url: emoji.emoji_url,
          id: item.emoji_id,
        };
      }
    })
    .filter((item) => item !== undefined);

  const [currentPage, setCurrentPage] = useState(1);

  const [emojisPerPage] = useState(10);

  const indexOfLastUser = currentPage * emojisPerPage;
  const indexOfFirstUser = indexOfLastUser - emojisPerPage;

  const currentEmojis = Object.entries(emojis_with_counts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      {currentEmojis.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-2 p-4 bg-white/5 rounded-lg transform hover:scale-105 transition-all duration-300 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={item[1].emoji_url}
                alt={item[1].emoji_name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item[1].name}</h3>
            </div>
            <div
              className="text-2xl font-bold text-purple-300 flex justify-center"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div>{item[1].count}</div>
              <div
                style={{
                  fontSize: "16px",
                }}
              >
                uses
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronLeft />
        </button>
        <div className="">
          {[
            ...Array(
              Math.ceil(emojis_with_counts.length / emojisPerPage)
            ).keys(),
          ].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => setCurrentPage(pageNumber + 1)}
              className={`${
                currentPage === pageNumber + 1
                  ? "bg-white/10"
                  : "bg-transparent"
              } p-2 rounded-full hover:bg-white/20 transition-all`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function ReactionsDisplay(props) {
  let most_used_reactions = props.data.most_used_reactions;
  let emojis = props.emojis;

  let reactions_with_counts = most_used_reactions
    .map((item) => {
      let emoji = undefined;
      if (item.reaction.split(":").length > 2) {
        emoji = emojis.find(
          (emoji) =>
            emoji.emoji_id.toString() ===
            item.reaction.split(":")[2].split(">")[0]
        );
      }
      if (emoji) {
        return {
          name: emoji.emoji_name,
          count: item.count,
          reaction_url: emoji.emoji_url,
        };
      } else {
        return {
          name: item.reaction,
          count: item.count,
          reaction_url: "",
        };
      }
    })
    .filter((item) => item !== undefined);

  const [currentPage, setCurrentPage] = useState(1);

  const [reactionsPerPage] = useState(10);

  const indexOfLastUser = currentPage * reactionsPerPage;
  const indexOfFirstUser = indexOfLastUser - reactionsPerPage;

  const currentreactions = Object.entries(reactions_with_counts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div>
      {currentreactions.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center gap-2 p-4 bg-white/5 rounded-lg transform hover:scale-105 transition-all duration-300 mb-4">
            <div className="w-10 h-10">
              {item[1].reaction_url === "" ? (
                <h3 style={{ fontSize: "2rem" }}>{item[1].name}</h3>
              ) : (
                <img
                  src={item[1].reaction_url}
                  alt={item[1].name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1"></div>
            <div
              className="text-2xl font-bold text-purple-300 flex justify-center"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div>{item[1].count}</div>
              <div
                style={{
                  fontSize: "16px",
                }}
              >
                reactions
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronLeft />
        </button>
        <div className="">
          {[
            ...Array(
              Math.ceil(reactions_with_counts.length / reactionsPerPage)
            ).keys(),
          ].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => setCurrentPage(pageNumber + 1)}
              className={`${
                currentPage === pageNumber + 1
                  ? "bg-white/10"
                  : "bg-transparent"
              } p-2 rounded-full hover:bg-white/20 transition-all`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className=" p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          style={{ height: "fit-content" }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

const App = () => {
  const [currentData, setCurrentData] = useState(data_2024);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentYear, setCurrentYear] = useState(2024); // Set currentYear to 2024 on load
  const users = getUsers();
  const emojis = getEmojis();
  const sections = [
    {
      title: "It takes a village...",
      index: 0,
      data: currentData,
    },
    {
      title: "Top Yappers",
      index: 1,
      data: currentData,
    },
    {
      title: "Gross abuse of character limit",
      index: 2,
      data: currentData,
    },
    {
      title: "Jlommitment to the jlit",
      index: 3,
      data: currentData,
    },
    {
      title: "Shoutout Gang",
      index: 4,
      data: currentData,
    },
    {
      title: "Emoji me the fuck up.",
      index: 5,
      data: currentData,
    },
    {
      title: "You're overreacting!",
      index: 6,
      data: currentData,
    },
    {
      title: "Most Poppin' channels",
      index: 7,
      data: currentData,
    },
  ];

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  const yearSelector = (year) => {
    setCurrentData(require(`./output/output_${year}.json`));
  };

  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, "all"];

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold text-center mb-12">
            Gang Wrapped {currentYear === "all" ? "All-Time" : currentYear}
          </h1>

          <div className="relative max-w-2xl mx-auto">
            <button
              onClick={prevSection}
              className="absolute left-0 top-snap -translate-y-1/2 -translate-x-16 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              style={{ top: "60px" }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSection}
              className="absolute right-0 -translate-y-1/2 translate-x-16 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
              style={{ top: "60px" }}
            >
              <ChevronRight size={24} />
            </button>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl transition-all duration-500">
              <div className="space-y-6">
                <SectionComponent
                  title={sections[currentSection].title}
                  index={sections[currentSection].index}
                  year={currentYear}
                  data={sections[currentSection].data}
                  users={users}
                  emojis={emojis}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl transition-all duration-500">
              <div className="flex justify-center gap-x-4">
                {years.map((year, index) => (
                  <div
                    className={`text-lg font-bold ${
                      currentYear === year ? "underline" : ""
                    } transition-all duration-300 cursor-pointer`}
                    onClick={() => {
                      setCurrentYear(year);
                      yearSelector(year);
                    }}
                    key={index}
                  >
                    {year === "all" ? "All-Time" : year}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
