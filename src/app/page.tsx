"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  type Task = {
    id: number;
    title: string;
    status: string;
    details: string;
    datetime: string;
  };

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [adminName, setAdminName] = useState<string>("Admin");

  const tasks: Task[] = [
    { id: 1, title: "商品が登録された", status: "completed", details: "商品名: Apple, 画像URL: /apple.jpg, 金額: ¥100", datetime: "2023-10-01 10:00" },
    { id: 2, title: "商品が仕入れされた", status: "completed", details: "商品名: Banana, 画像URL: /banana.jpg, 数量: 50", datetime: "2023-10-02 11:00" },
    { id: 3, title: "販売注文が入った", status: "in-progress", details: "購入者情報: John Doe, 購入された商品一覧: [Apple, Banana], それぞれの数量: [10, 5], 合計金額: ¥1500", datetime: "2023-10-03 12:00" },
  ];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full bg-gray-100 text-black p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40} className="cursor-pointer" />
          <h1 className="ml-2 text-2xl font-bold">トップページ</h1>
        </div>
        <div>
          {isLoggedIn ? (
            <div className="flex items-center">
              <span className="mr-4">こんにちは, {adminName}</span>
              <button onClick={handleLogout} className="bg-white text-red-500 p-2 rounded border border-red-500">ログアウト</button>
            </div>
          ) : (
            <button onClick={handleLogin} className="bg-white text-blue-500 p-2 rounded border border-blue-500">ログイン</button>
          )}
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-1/6 bg-gray-50 p-4 border-r border-gray-300" aria-label="Sidebar">
          <h2 className="text-xl font-bold mb-4">業務一覧</h2>
          <ul>
            <li className="mb-2">
              <button
                className="w-full text-left p-2 rounded bg-white"
                onClick={() => window.location.href = '/ProductRegistPage'}
              >
                商品登録
              </button>
            </li>
            <li className="mb-2"><button className="w-full text-left p-2 rounded bg-white">商品仕入れ</button></li>
            <li className="mb-2"><button className="w-full text-left p-2 rounded bg-white">販売一覧</button></li>
            <li className="mb-2"><button className="w-full text-left p-2 rounded bg-white">会員一覧</button></li>
          </ul>
        </aside>
        <div className="flex-1 flex bg-gray-50">
          <aside className="w-1/4 bg-white p-4">
            <h2 className="text-xl font-bold mb-4">最新のイベント</h2>
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="mb-2">
                  <button
                    className={`w-full text-left p-2 rounded ${task.id === selectedTask?.id ? "bg-blue-100" : "bg-white"}`}
                    onClick={() => handleTaskClick(task)}
                  >
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.datetime}</p>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <main className="flex-1 p-4 bg-white">
            {selectedTask ? (
              <div className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
                  <button className="text-gray-500">X</button>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold">Details:</h3>
                  <p>{selectedTask.details}</p>
                  <p>{selectedTask.datetime}</p>
                </div>
                <div className="flex justify-between">
                  <button className="bg-gray-200 p-2 rounded">Move to archive</button>
                </div>
              </div>
            ) : (
              <p>Select a task to view details</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
