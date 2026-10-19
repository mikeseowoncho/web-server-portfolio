"use client";

import { useState, useEffect } from "react";
import {
  PixelFamicomConsole,
  PixelFamicomHardware,
  PixelMiniController,
  HexChip,
} from "@/components/Icons";

export default function FamicomRackPortfolio() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    category: "current",
    week: "Week 04 - AUTH",
    title: "",
    description: "",
    repoUrl: "",
    deployUrl: "",
    tags: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (e) {
      console.error("CART_READ_FAIL", e);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setForm({
        category: "current",
        week: "Week 04 - AUTH",
        title: "",
        description: "",
        repoUrl: "",
        deployUrl: "",
        tags: "",
      });
      setShowModal(false);
      fetchProjects();
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`[EJECT] "${title}" 팩을 슬롯에서 제거하시겠습니까?`)) return;
    const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchProjects();
  };

  return (
    <div className="min-h-screen bg-[#F0ECE3] text-[#2D1B18] p-3 sm:p-6 font-mono selection:bg-[#E5AC2B] selection:text-black">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* 1. 최상단 상태 인디케이터 바 */}
        <div className="flex justify-between items-center text-[11px] font-black border-4 border-[#2D1B18] bg-[#F5F2EB] px-3 py-1 shadow-[3px_3px_0px_0px_#2D1B18]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-emerald-700">NODE: ONLINE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-700">DB SYNC: CONNECTED</span>
            <span className="w-2 h-2 bg-emerald-500" />
          </div>
        </div>

        {/* 2. 패미컴 1P 컨트롤러 메인 헤더 */}
        <header className="border-4 border-[#2D1B18] bg-[#E7C77E] p-3 rounded-xl shadow-[5px_5px_0px_0px_#2D1B18]">
          <div className="border-4 border-[#8D1426] bg-[#DCA836] p-3 rounded-lg flex items-center justify-between gap-4">
            {/* 좌측: 1번 뱃지 & 십자키 */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-6 h-6 bg-[#2D1B18] text-[#E7C77E] border border-black/40 flex items-center justify-center font-black text-xs rounded">
                1
              </div>
              <div className="relative w-14 h-14 bg-[#2D1B18] rounded flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <div className="absolute w-12 h-4 bg-[#3B2F2F] rounded-sm" />
                <div className="absolute w-4 h-12 bg-[#3B2F2F] rounded-sm" />
                <div className="relative w-3 h-3 bg-[#1A1110] rounded-full z-10" />
              </div>
            </div>

            {/* 중앙: 버건디 메인 배너 박스 */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-[#8D1426] border-4 border-[#2D1B18] rounded px-3 py-2 text-center shadow-[2px_2px_0px_0px_#2D1B18]">
                <h1 className="text-lg sm:text-2xl font-black tracking-widest text-[#F0ECE3] uppercase border-b-2 border-[#DCA836] pb-0.5">
                  FAMILY COMPUTER
                </h1>
                <p className="text-[10px] sm:text-xs font-black tracking-widest text-[#DCA836] mt-1 uppercase">
                  PLAYER 1: READY
                </p>
              </div>

              {/* 하단 SELECT / START 알약 버튼 */}
              <div className="flex justify-center gap-5 mt-2">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-2 bg-[#2D1B18] rounded-full" />
                  <span className="text-[8px] font-black text-[#8D1426] mt-0.5">
                    SELECT
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-2 bg-[#2D1B18] rounded-full" />
                  <span className="text-[8px] font-black text-[#8D1426] mt-0.5">
                    START
                  </span>
                </div>
              </div>
            </div>

            {/* 우측: B, A 버튼 플레이트 */}
            <div className="border-2 border-[#2D1B18] bg-[#C79224] px-3 py-2 rounded-lg flex items-center gap-2.5 shadow-[2px_2px_0px_0px_#2D1B18] shrink-0">
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-black text-[#2D1B18]">B</span>
                <div className="w-7 h-7 rounded-full bg-[#8D1426] border-2 border-[#2D1B18] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[9px] font-black text-[#2D1B18]">A</span>
                <div className="w-7 h-7 rounded-full bg-[#8D1426] border-2 border-[#2D1B18] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]" />
              </div>
            </div>
          </div>
        </header>

        {/* 3. 메인 그리드 (좌측 5 / 우측 7 비율) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* 좌측 패널: OPERATOR SPEC */}
          <aside className="md:col-span-5 space-y-4">
            <div className="border-4 border-[#2D1B18] bg-[#FAF7EE] rounded-lg shadow-[4px_4px_0px_0px_#2D1B18] overflow-hidden">
              <div className="bg-[#8D1426] text-white font-black text-center py-1.5 border-b-4 border-[#2D1B18] text-sm tracking-wider uppercase">
                OPERATOR SPEC
              </div>

              <div className="p-3.5 space-y-4">
                {/* 1) OPERATOR SPEC ID CARD */}
                <div className="border-2 border-[#2D1B18] bg-[#F0ECE3] p-3 rounded space-y-2 border-b-2 border-[#2D1B18] pb-3 shadow-[2px_2px_0px_0px_#2D1B18]">
                  <div className="flex justify-between items-center border-b border-[#2D1B18]/20 pb-1">
                    <span className="text-[9px] font-black text-[#8D1426] tracking-wider">
                      SYSTEM ID
                    </span>
                    <span className="text-[9px] font-bold text-zinc-600">
                      HVC-001 // SEC-2026
                    </span>
                  </div>
                  <div className="text-xs space-y-1.5 font-bold">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-[10px]">
                        OPERATOR
                      </span>
                      <span className="text-[#8D1426] font-black text-sm">
                        ANONYMOUS
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-[10px]">ROLE</span>
                      <span className="text-zinc-800 text-[11px]">
                        SECURITY / DEV
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-500 text-[10px]">ARCH</span>
                      <span className="text-emerald-700 font-black text-[11px]">
                        Next.js + MongoDB
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2) Tech / Security 4개 반도체 칩셋 */}
                <div className="space-y-2 border-b-2 border-dashed border-[#2D1B18]/30 pb-3">
                  <div className="text-center text-xs font-black text-[#8D1426]">
                    Tech / Security
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 justify-items-center">
                    <HexChip title="Next.js" theme="gold" />
                    <HexChip title="MongoDB" theme="green" />
                    <HexChip title="NextAuth" theme="gold" />
                    <HexChip title="OWASP" theme="dark" />
                  </div>
                </div>

                {/* 3) Retro Console Status */}
                <div className="space-y-2 text-xs font-bold">
                  <div className="text-center font-black text-[#8D1426]">
                    Retro Console Status
                  </div>

                  <div className="flex items-center gap-3 border-2 border-[#2D1B18] bg-[#F0ECE3] p-2 rounded">
                    <PixelFamicomConsole />
                    <div className="leading-tight">
                      <span className="text-[10px] text-zinc-500 block">
                        Status
                      </span>
                      <span className="font-black text-[#8D1426]">
                        8-BIT / 0%
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-2 border-[#2D1B18] bg-[#F0ECE3] p-2 rounded">
                    <PixelFamicomHardware />
                    <div className="leading-tight">
                      <span className="text-[10px] text-zinc-500 block">
                        Favorite Hardware
                      </span>
                      <span className="font-black text-[#8D1426]">
                        160 mm/s
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* 우측 패널: CARTRIDGE RACK */}
          <main className="md:col-span-7 space-y-3">
            <div className="flex justify-between items-center gap-2">
              <div className="bg-[#8D1426] text-white font-black px-4 py-1 border-4 border-[#2D1B18] rounded-t-lg text-xs tracking-wider shadow-[3px_3px_0px_0px_#2D1B18] uppercase">
                CARTRIDGE RACK
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="bg-[#10B981] hover:bg-[#059669] text-white font-black px-3 py-1 border-4 border-[#2D1B18] rounded text-xs shadow-[3px_3px_0px_0px_#2D1B18] active:translate-y-0.5 uppercase transition"
              >
                [+] INSERT NEW CART
              </button>
            </div>

            <div className="border-4 border-[#2D1B18] bg-[#5E121E] p-3 sm:p-4 rounded-xl shadow-[5px_5px_0px_0px_#2D1B18]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {projects.map((proj, idx) => {
                  const isRedCart = idx % 2 === 0;

                  return (
                    <div
                      key={proj._id}
                      className={`border-4 border-[#2D1B18] rounded-lg p-2.5 shadow-[4px_4px_0px_0px_#2D1B18] flex flex-col justify-between ${
                        isRedCart ? "bg-[#9E1B2E]" : "bg-[#DCA836]"
                      }`}
                    >
                      {/* 팩 상단 홈 3줄 & 제거 버튼 */}
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex gap-1">
                          <div className="w-3.5 h-1 bg-[#2D1B18] rounded" />
                          <div className="w-3.5 h-1 bg-[#2D1B18] rounded" />
                          <div className="w-3.5 h-1 bg-[#2D1B18] rounded" />
                        </div>
                        <button
                          onClick={() => handleDelete(proj._id, proj.title)}
                          className="text-[9px] text-[#2D1B18] hover:text-white font-black px-1"
                          title="카트리지 제거"
                        >
                          ✕
                        </button>
                      </div>

                      {/* 팩 중앙 화이트 스티커 라벨 (설명 필드 추가됨) */}
                      <div className="border-2 border-[#2D1B18] bg-[#FAF7EE] p-2 rounded shadow-inner mb-2.5 text-center flex flex-col justify-between">
                        <div>
                          <div className="font-black text-[9px] text-[#8D1426] border-b border-[#2D1B18]/20 pb-0.5 mb-1 tracking-wider uppercase">
                            {proj.week || "STAGE LAB"}
                          </div>
                          <div className="font-black text-xs text-[#2D1B18] leading-tight line-clamp-2 min-h-[24px] flex items-center justify-center">
                            {proj.title}
                          </div>
                          {proj.description && (
                            <p className="text-[10px] text-zinc-600 font-medium mt-1 line-clamp-2 leading-tight border-t border-dashed border-[#2D1B18]/20 pt-1">
                              {proj.description}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-center text-[7px] text-zinc-500 font-bold mt-1.5 pt-0.5 border-t border-[#2D1B18]/10">
                          <span>SEAL</span>
                          <span>
                            {proj.category === "current" ? "SEC-LAB" : "RETRO"}
                          </span>
                        </div>
                      </div>

                      {/* 하단 링크 버튼 2개: ROM SOURCE & START DEMO */}
                      <div className="grid grid-cols-2 gap-1.5 font-black text-[9px]">
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-2 border-[#2D1B18] bg-[#2D1B18] hover:bg-black text-white py-1.5 rounded flex items-center justify-center gap-0.5 shadow-[1.5px_1.5px_0px_0px_#FAF7EE] transition"
                        >
                          <span>ROM SOURCE</span>
                          <span>↗</span>
                        </a>
                        <a
                          href={proj.deployUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-2 border-[#2D1B18] bg-[#E7C77E] hover:bg-[#F3C444] text-[#2D1B18] py-1.5 rounded flex items-center justify-center gap-0.5 shadow-[1.5px_1.5px_0px_0px_#2D1B18] transition font-black"
                        >
                          <span>START DEMO</span>
                          <span>▶</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {projects.length === 0 && (
                <div className="border-4 border-dashed border-[#2D1B18]/40 p-8 text-center text-[#F0ECE3] text-xs font-black bg-[#4A0E17] rounded-lg">
                  [RACK EMPTY] 카트리지가 장착되지 않았습니다. 우측 상단의 [+]
                  버튼을 누르세요.
                </div>
              )}
            </div>
          </main>
        </div>

        {/* 4. 최하단 푸터 */}
        <footer className="border-4 border-[#2D1B18] bg-[#E7C77E] p-2 rounded-lg shadow-[3px_3px_0px_0px_#2D1B18] flex justify-between items-center text-[9px] sm:text-[10px] font-black text-[#2D1B18]">
          <div className="flex items-center gap-2">
            <PixelMiniController />
            <span>NEXT.JS & MONGODB ATLAS // WEB SERVER SECURITY 2026</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#2D1B18]" />
            <span className="w-3 h-3 rounded-full bg-[#8D1426]" />
          </div>
        </footer>
      </div>

      {/* 신규 카트리지 삽입 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border-4 border-[#2D1B18] bg-[#FAF7EE] w-full max-w-lg p-5 rounded-xl shadow-[6px_6px_0px_0px_#2D1B18] space-y-3 text-xs font-bold">
            <div className="flex justify-between items-center border-b-2 border-[#2D1B18] pb-2">
              <h2 className="text-sm font-black text-[#8D1426] uppercase">
                BURN NEW ROM TO CARTRIDGE
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-500 hover:text-black font-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-600 block mb-1 text-[10px]">
                    SLOT TYPE
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full bg-[#F0ECE3] border-2 border-[#2D1B18] p-1.5 rounded"
                  >
                    <option value="current">2026-2 실습 과제</option>
                    <option value="legacy">레트로 아카이브 / 개인</option>
                  </select>
                </div>
                <div>
                  <label className="text-zinc-600 block mb-1 text-[10px]">
                    STAGE / WEEK
                  </label>
                  <input
                    value={form.week}
                    onChange={(e) => setForm({ ...form, week: e.target.value })}
                    placeholder="Week 04 - AUTH"
                    required
                    className="w-full bg-white border-2 border-[#2D1B18] p-1.5 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-600 block mb-1 text-[10px]">
                  PROJECT TITLE
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Next.js & MongoDB Login"
                  required
                  className="w-full bg-white border-2 border-[#2D1B18] p-1.5 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-zinc-600 block mb-1 text-[10px]">
                    GITHUB REPO URL
                  </label>
                  <input
                    value={form.repoUrl}
                    onChange={(e) =>
                      setForm({ ...form, repoUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    required
                    className="w-full bg-white border-2 border-[#2D1B18] p-1.5 rounded"
                  />
                </div>
                <div>
                  <label className="text-zinc-600 block mb-1 text-[10px]">
                    DEPLOY URL
                  </label>
                  <input
                    value={form.deployUrl}
                    onChange={(e) =>
                      setForm({ ...form, deployUrl: e.target.value })
                    }
                    placeholder="https://....vercel.app"
                    required
                    className="w-full bg-white border-2 border-[#2D1B18] p-1.5 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-600 block mb-1 text-[10px]">
                  SUMMARY
                </label>
                <input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="핵심 구현 기술 요약"
                  required
                  className="w-full bg-white border-2 border-[#2D1B18] p-1.5 rounded"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 border-2 border-[#2D1B18] bg-zinc-300"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 border-2 border-[#2D1B18] bg-[#10B981] text-white font-black"
                >
                  BURN & SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
