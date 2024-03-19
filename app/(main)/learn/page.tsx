import FeedWrapper from "@/components/ui/feed-wrapper";
import StickyWrapper from "@/components/ui/sticky-wrapper";
import React from "react";
import Header from "./header";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import UserProgress from "@/components/ui/user-progress";

const LearnPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={false}
        />
      </StickyWrapper>

      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
