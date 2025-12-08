import React from 'react';
import { Scene, Character } from '../types';
import { ArrowRight } from 'lucide-react';

interface Props {
  scenes: Scene[];
  characters: Character[];
  onUpdateScene: (id: number, updates: Partial<Scene>) => void;
  onNext: () => void;
}

export const StoryboardEditor: React.FC<Props> = ({ scenes, characters, onUpdateScene, onNext }) => {
  
  // Helper to get char names
  const getCharNames = (ids: string[]) => {
    return ids.map(id => characters.find(c => c.id === id)?.name).filter(Boolean).join(', ');
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 pb-20">
      <div className="flex justify-between items-end mb-6 sticky top-24 z-10 bg-[#0f0f0f] py-4 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl font-bold text-white">Step 3: 絵コンテ確認 (全{scenes.length}シーン)</h2>
          <p className="text-zinc-400">生成されたシーンを確認・修正してください。ここでの内容が画像生成の設計図になります。</p>
        </div>
        <button
          onClick={onNext}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
        >
          画像生成へ進む <ArrowRight size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {scenes.map((scene) => (
          <div key={scene.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex gap-4 hover:border-zinc-600 transition-colors">
            <div className="flex-shrink-0 w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-500">
              #{scene.id}
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              
              {/* Description - Enhanced visibility */}
              <div className="lg:col-span-4">
                <label className="block text-xs font-bold text-zinc-400 mb-2 bg-zinc-800/50 p-1 rounded inline-block">シーン概要・状況説明</label>
                <textarea
                  value={scene.description}
                  onChange={(e) => onUpdateScene(scene.id, { description: e.target.value })}
                  className="w-full h-32 bg-zinc-950 border border-zinc-700 rounded p-3 text-base text-white leading-relaxed resize-none focus:border-red-600 focus:outline-none focus:bg-black"
                  placeholder="どのようなシーンか記述してください"
                />
              </div>

              {/* Tech Specs */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">被写体・構図 (フレーミング)</label>
                    <input
                    type="text"
                    value={scene.subjectAndComposition}
                    onChange={(e) => onUpdateScene(scene.id, { subjectAndComposition: e.target.value })}
                    className="w-full bg-black/20 border border-zinc-700 rounded p-2 text-sm text-zinc-300 focus:border-red-600 focus:outline-none"
                    placeholder="誰が、ショットサイズ、アングルなど"
                    />
                </div>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">場所・時間・天候</label>
                    <input
                    type="text"
                    value={scene.setting}
                    onChange={(e) => onUpdateScene(scene.id, { setting: e.target.value })}
                    className="w-full bg-black/20 border border-zinc-700 rounded p-2 text-sm text-zinc-300 focus:border-red-600 focus:outline-none"
                    />
                </div>
              </div>

              {/* Action/Emotion */}
              <div className="lg:col-span-4 space-y-4">
                 <div>
                    <label className="block text-xs text-zinc-500 mb-1">アクション・動き</label>
                    <input
                    type="text"
                    value={scene.action}
                    onChange={(e) => onUpdateScene(scene.id, { action: e.target.value })}
                    className="w-full bg-black/20 border border-zinc-700 rounded p-2 text-sm text-zinc-300 focus:border-red-600 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-xs text-zinc-500 mb-1">感情・演技</label>
                    <input
                    type="text"
                    value={scene.emotion}
                    onChange={(e) => onUpdateScene(scene.id, { emotion: e.target.value })}
                    className="w-full bg-black/20 border border-zinc-700 rounded p-2 text-sm text-zinc-300 focus:border-red-600 focus:outline-none"
                    />
                </div>
                <div className="text-xs text-zinc-500 pt-2">
                    登場: <span className="text-zinc-300">{getCharNames(scene.charactersInScene) || 'なし'}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};