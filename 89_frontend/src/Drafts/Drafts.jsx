import React, { useState } from 'react';
import { Plus, Calendar, Edit, Trash2, Eye } from 'lucide-react';

const DraftsPage = () => {
  const [drafts, setDrafts] = useState([
    {
      id: 1,
      title: 'Web App Project',
      preview: 'function App() {\n  return (\n    <div className="min-h-screen">\n      <h1>Hello World</h1>\n    </div>\n  );\n}',
      date: '2 days ago',
      type: 'React Component'
    },
    {
      id: 2,
      title: 'API Integration',
      preview: 'const fetchData = async () => {\n  try {\n    const response = await fetch("/api/data");\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(error);\n  }\n};',
      date: '1 week ago',
      type: 'JavaScript'
    },
    {
      id: 3,
      title: 'Landing Page Layout',
      preview: '<div className="bg-gradient-to-r from-blue-500 to-purple-600">\n  <div className="container mx-auto px-4 py-16">\n    <h1 className="text-5xl font-bold text-white mb-8">\n      Welcome to Our Platform\n    </h1>\n    <p className="text-xl text-gray-200">\n      Build amazing things together\n    </p>\n  </div>\n</div>',
      date: '3 days ago',
      type: 'HTML/JSX'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDraft, setNewDraft] = useState({ title: '', code: '', type: 'React Component' });

  const addDraft = () => {
    if (newDraft.title && newDraft.code) {
      const draft = {
        id: Date.now(),
        title: newDraft.title,
        preview: newDraft.code,
        date: 'Just now',
        type: newDraft.type
      };
      setDrafts([draft, ...drafts]);
      setNewDraft({ title: '', code: '', type: 'React Component' });
      setShowAddForm(false);
    }
  };

  const deleteDraft = (id) => {
    setDrafts(drafts.filter(draft => draft.id !== id));
  };

  const typeColors = {
    'React Component': 'bg-blue-100 text-blue-800',
    'JavaScript': 'bg-yellow-100 text-yellow-800',
    'HTML/JSX': 'bg-green-100 text-green-800',
    'CSS': 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F1F1EF', color: '#514232' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 pb-8 border-b-2" style={{ borderColor: '#B8B2A8' }}>
          <h1 className="text-4xl font-light mb-4 tracking-wide">My Drafts</h1>
          <p className="text-lg opacity-80">Your workspace for ideas and projects in progress</p>
        </div>

        {/* Add Draft Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#F1F1EF' }}>
              <h3 className="text-2xl font-semibold mb-4">Add New Draft</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={newDraft.title}
                    onChange={(e) => setNewDraft({...newDraft, title: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#B8B2A8', borderColor: '#514232' }}
                    placeholder="Enter draft title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={newDraft.type}
                    onChange={(e) => setNewDraft({...newDraft, type: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2"
                    style={{ backgroundColor: '#B8B2A8', borderColor: '#514232' }}
                  >
                    <option value="React Component">React Component</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="HTML/JSX">HTML/JSX</option>
                    <option value="CSS">CSS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Code</label>
                  <textarea
                    value={newDraft.code}
                    onChange={(e) => setNewDraft({...newDraft, code: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:ring-2 font-mono text-sm"
                    style={{ backgroundColor: '#B8B2A8', borderColor: '#514232' }}
                    rows="12"
                    placeholder="Paste your code here..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={addDraft}
                    className="flex-1 py-3 px-6 rounded-full font-medium text-white transition-all hover:scale-105"
                    style={{ backgroundColor: '#514232' }}
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-3 px-6 rounded-full font-medium border-2 transition-all hover:bg-opacity-10"
                    style={{ borderColor: '#514232', color: '#514232' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Drafts Grid */}
        {drafts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="rounded-xl p-6 transition-all hover:-translate-y-2 hover:shadow-xl relative overflow-hidden"
                style={{ backgroundColor: '#B8B2A8' }}
              >
                {/* Top Border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r" style={{ background: 'linear-gradient(90deg, #514232, #F1F1EF)' }}></div>
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: '#514232' }}>{draft.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[draft.type]}`}>
                      {draft.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm opacity-70 px-3 py-1 rounded-full" style={{ backgroundColor: '#F1F1EF' }}>
                    <Calendar size={14} />
                    {draft.date}
                  </div>
                </div>

                {/* Code Preview */}
                <div className="rounded-lg p-4 mb-4 font-mono text-sm leading-relaxed max-h-48 overflow-hidden relative border-r-4" style={{ backgroundColor: '#F1F1EF', borderColor: '#514232' }}>
                  <pre className="whitespace-pre-wrap break-words">{draft.preview}</pre>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t" style={{ background: 'linear-gradient(transparent, #F1F1EF)' }}></div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full font-medium text-white transition-all hover:scale-105" style={{ backgroundColor: '#514232' }}>
                    <Edit size={16} />
                    Edit
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full font-medium border-2 transition-all hover:bg-opacity-10" style={{ borderColor: '#514232', color: '#514232' }}>
                    <Eye size={16} />
                    View
                  </button>
                  <button 
                    onClick={() => deleteDraft(draft.id)}
                    className="p-2 rounded-full transition-all hover:bg-red-100 hover:text-red-600"
                    style={{ color: '#514232' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 opacity-60">
            <div className="w-20 h-20 mx-auto mb-6 opacity-50" style={{ color: '#514232' }}>
              <Edit size={80} />
            </div>
            <h3 className="text-2xl font-medium mb-2">No drafts yet</h3>
            <p className="text-lg">Start by creating your first draft</p>
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="fixed bottom-8 left-8 w-16 h-16 rounded-full text-white text-2xl transition-all hover:scale-110 shadow-lg hover:shadow-xl"
          style={{ backgroundColor: '#514232' }}
        >
          <Plus size={24} className="mx-auto" />
        </button>
      </div>
    </div>
  );
};

export default DraftsPage;