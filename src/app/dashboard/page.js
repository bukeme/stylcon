"use client";
import api from "@/api";
import useAuthStore from "@/components/authStore";
import CompletedCard from "@/components/Dashboard/CompletedCard";
import DashboardHeaderBasic from "@/components/Dashboard/DashboardHeaderBasic";
import DraftCard from "@/components/Dashboard/DraftCard";
import Important from "@/components/Dashboard/Important";
import ButtonBlack from "@/components/Shared/ButtonBlack";
import CustomLink from "@/components/Shared/CustomLink";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle, Plus, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [draft, setDraft] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showImportant, setShowImportant] = useState(true);
  const { setActiveSideNav, user, reload, setPageLoad, setActiveOption } =
    useAuthStore();
  const [loading, setLoading] = useState(false);
  const [activeNav, setActiveNav] = useState("draft");

  useEffect(() => {
    setActiveSideNav(null);
    setPageLoad(false);
  }, []);

  useEffect(() => {
    const getOutfits = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/api/outfits/outfit-list/");
        // console.log(data);
        const sorted = data.sort(
          (a, b) =>
            new Date(b.updated_at || b.created_at) -
            new Date(a.updated_at || a.created_at)
        );
        setDraft(sorted.filter((outfit) => !outfit.completed));
        setCompleted(sorted.filter((outfit) => outfit.completed));
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getOutfits();
  }, [reload]);

  return (
    <div className="max-w-[1500px] mx-auto">
      <DashboardHeaderBasic
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        isEmpty={draft.length === 0}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />
      {draft.length > 0 ? (
        <section className="mt-6 px-6 lg:px-9 mb-14 mx-auto">
          <div className="flex flex-col gap-2 md:flex-row justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">
                Hey {user?.username || user?.first_name || ""}!
              </h1>
              <p className="text-grey">{"Let's create an outfit."}</p>
            </div>
            <CustomLink url={"/dashboard/options"}>
              <ButtonBlack
                text={"Create your outfit"}
                className={"w-fit p-4 justify-center h-fit"}
              />
            </CustomLink>
          </div>
          {showImportant && <Important setShowImportant={setShowImportant} />}
          {!loading && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {activeNav === "draft" &&
                draft.map((item) => <DraftCard key={item.id} item={item} />)}
              {activeNav === "completed" &&
                completed.map((item) => (
                  <CompletedCard key={item.id} item={item} />
                ))}
            </div>
          )}
          {activeNav === "completed" && completed.length === 0 && (
            <div className="flex flex-col items-center gap-6 text-[#FF0000] w-full mt-8">
              <AlertTriangle size={48} />
              <p className="text-lg">You have no completed Outfit</p>
            </div>
          )}
        </section>
      ) : !loading ? (
        <section className="mt-6 px-6 lg:px-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-grey">
              {"View all your designs and customizations"}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 my-6">
            <div className="bg-[#FBFBFC] w-full h-[616px] flex flex-col gap-4 items-center justify-center px-2 sm:px-0">
              <User color="#969696" />
              <h3 className="text-2xl font-bold">
                {"You haven't cooked yet."}
              </h3>
              <p className="text-grey text-center max-w-[384px]">
                {
                  " You do not have any designs, click on the button below to start creating one."
                }
              </p>

              <CustomLink url={"/dashboard/options"}>
                <ButtonBlack
                  text={"Create an Outfit"}
                  icon={<Plus size={16} />}
                  className="gap-3"
                />
              </CustomLink>
            </div>
            <div className="md:max-w-[400px]">
              {showImportant && (
                <Important setShowImportant={setShowImportant} />
              )}
            </div>
          </div>
        </section>
      ) : (
        <Skeleton className={"mt-6 mx-6 lg:mx-8 h-[80dvh]"} />
      )}
    </div>
  );
};

export default Dashboard;
