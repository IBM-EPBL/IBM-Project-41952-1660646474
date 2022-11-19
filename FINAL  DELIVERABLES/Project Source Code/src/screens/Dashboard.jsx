import {
  Progress,
  SkeletonCircle,
  SkeletonText,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import Skill from "../components/Skill";
import { AppContext } from "../context/AppContext";
import { getUserSkills } from "../proxies/backend_api";

const Dashboard = () => {
  const { user, skills, setSkills } = useContext(AppContext);

  const [selectedSkills, setSelectedSkills] = useState([]);

  const [skillsLoading, setSkillsLoading] = useState(false);

  const [jobsLoading, setJobsLoading] = useState(false);

  const [query, setquery] = useState("");

  const [posts, setPosts] = useState(null);

  const id = import.meta.env.VITE_ADZUNA_API_ID;

  const key = import.meta.env.VITE_ADZUNA_API_KEY;

  const baseURL_with_skills = `http://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${id}&app_key=${key}&results_per_page=15&what=${query}&what_and=${selectedSkills.join(
    " "
  )}&&content-type=application/json`;

  const baseURL = `http://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${id}&app_key=${key}&results_per_page=15&what=${query}&content-type=application/json`;

  const searchJobsFromQuery = async () => {
    setJobsLoading(true);

    if (query !== "" || !posts) {
      const { data } = await axios.get(baseURL);
      setPosts(data.results);
    }

    setJobsLoading(false);
  };

  const searchWithSkills = async () => {
    setJobsLoading(true);

    const { data } = await axios.get(baseURL_with_skills);

    setPosts(data.results);

    setJobsLoading(false);
  };

  useEffect(() => {
    if (user) {
      (async () => {
        setSkillsLoading(true);
        setSkills(await getUserSkills(user.token));
        setSkillsLoading(false);
      })();
    }
  }, [user]);

  useEffect(() => {
    searchWithSkills();
  }, [selectedSkills]);

  useEffect(() => {
    searchJobsFromQuery();
  }, []);

  return (
    <>
      {(jobsLoading || skillsLoading) && (
        <Progress size="xs" isIndeterminate colorScheme={"purple"} />
      )}
      <div className="flex gap-10 m-10">
        <div className="hidden lg:flex bg-purple-600 w-1/5 p-5 h-3/6 rounded-lg text-center flex-col gap-4">
          <div className="text-2xl text-white capitalize font-extrabold">
            Your skills
          </div>
          {skillsLoading ? (
            <Spinner
              className="self-center my-5"
              thickness="3px"
              speed="0.65s"
              emptyColor="gray.200"
              color="black.100"
              size="lg"
            />
          ) : (
            <ul className="list-none text-gray-200 flex flex-col gap-2">
              {skills?.length === 0 ? (
                <p className="text-gray-300">
                  Skills you add in the profile section will appear here!!
                </p>
              ) : (
                skills.map((skill, ind) => (
                  <Skill
                    skill={skill}
                    key={ind}
                    setSelectedSkills={setSelectedSkills}
                    disabled={skillsLoading}
                  />
                ))
              )}
            </ul>
          )}
          <p className="text-white text-sm">
            (Include your skills in the search result)
          </p>
        </div>

        <div className="mx-auto min-w-[80%] ">
          <SearchBar setquery={setquery} onClick={searchJobsFromQuery} />
          {query === "" ? (
            <h2 className="text-2xl mt-5">Recommended Jobs</h2>
          ) : (
            <h2 className="text-2xl mt-5">
              Search for keywords {query}
              {filterUsingSkills && `,${skills.join(",")}`}
            </h2>
          )}

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5">
            {jobsLoading
              ? [...new Array(10)].map((_, ind) => (
                  <div key={ind}>
                    <SkeletonCircle size="8" className="mb-5" />
                    <SkeletonText
                      mt="4"
                      noOfLines={8}
                      spacing="4"
                      color={"red"}
                    />
                  </div>
                ))
              : posts?.map((post, ind) => (
                  <JobCard
                    key={ind}
                    title={post.title}
                    company={post.company.display_name}
                    description={post.description}
                    link={post.redirect_url}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;