from difflib import SequenceMatcher

def search_confidence(query, results):
    def similarity_to_query(results):
        return SequenceMatcher(None, query, results['title']).ratio()

    return sorted(results, key=similarity_to_query, reverse=True)
