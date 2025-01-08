import React from "react";
import { Link } from "react-router-dom";
import "./DictionaryApp.css"


interface WordsData {
  id: number;
  worduz: string;
  defenation: string;
  source?: string;
  image?: string;
  category_id: number;
  pronun: string | null;
  type: string;
  wordeng: string;
}

interface WordListProps {
  words: WordsData[];
  searchTerm: string;
  currentLanguage: 'uz' | 'en';
  onWordClick: (word: WordsData) => void;
}

const WordList: React.FC<WordListProps> = ({
  words,
  searchTerm,
  currentLanguage,
  onWordClick,
}) => {
  const [searchQuery, setSearchQuery] = React.useState(searchTerm);

  const filteredWords = words.filter((word) =>
    word.worduz.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.wordeng.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      regex.test(part) ? <mark key={index}>{part}</mark> : part
    );
  };

  return (
    <div>
      <header className="header fixed-header">
        <input
          type="text"
          placeholder={
            currentLanguage === 'uz' ? 'Qidirish' : 'Search'
          }
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>
      <main className="word-list">
        <h2>{currentLanguage === 'uz' ? "So'zlar" : "Words"}</h2>
        <ul>
          {filteredWords.map((word) => (
            <li key={word.id} className="word-item">
              <Link
                to={`/word/${word.id}`}
                className="word-link"
                onClick={() => onWordClick(word)}
              >
                <div className="word-main">
                  {highlightText(
                    currentLanguage === 'uz' ? word.worduz : word.wordeng,
                    searchQuery
                  )}
                </div>
                <div className="word-secondary">
                  {highlightText(
                    currentLanguage === 'uz' ? word.wordeng : word.worduz,
                    searchQuery
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default WordList;
