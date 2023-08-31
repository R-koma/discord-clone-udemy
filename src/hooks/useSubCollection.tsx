import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  DocumentData,
  Query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAppSelector } from "../app/hooks";

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);
  const channelId = useAppSelector((state) => state.channel.channelId);

  //発火のタイミングを決めることができるhooks.
  useEffect(() => {
    let collectionRef = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    );

    //メッセージを時間順にソート。(firebaseで用意されているorderByを使う。)
    //昇順: asc, 降順: desc
    const collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "asc")
    );

    //リアルタイムで情報を出したい時、onSnapshotを使う。
    //collectionRefには参照したい情報を記述する。何を参照するのか。
    //snapshotはリアルタイムの切り取りのようなもの。
    //setMessagesで状態を更新する。
    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
      // console.log(results);
    });
  }, [channelId]);
  return { subDocuments };
};

export default useSubCollection;
