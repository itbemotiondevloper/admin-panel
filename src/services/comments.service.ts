import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  getCountFromServer,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export const commentsService = {
  // Public list
  async getCommentsByPost(postId: string) {
    const ref = collection(db, 'comments');
    const q = query(ref, where('post', '==', postId), where('isHidden', '==', false));
    const snap = await getDocs(q);
    const list = snap.docs.map(d => {
      const data = d.data() as any;
      const createdAtDate = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now());
      return {
        _id: d.id,
        id: d.id,
        ...data,
        createdAtDate,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt
      };
    });
    // Sort descending by date
    list.sort((a, b) => b.createdAtDate.getTime() - a.createdAtDate.getTime());
    return list;
  },

  // Public Create (Real authenticated user only)
  async submitComment(payload: {
    post: string;
    postTitle: string;
    userId: string;
    name: string;
    text: string;
  }) {
    // 1. Verify Post exists, status == Published, and matches Title
    const postRef = doc(db, 'posts', payload.post);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      throw new Error("Target blog post does not exist.");
    }
    const postData = postSnap.data();
    if (postData.status !== "Published") {
      throw new Error("Target blog post is not published.");
    }
    if (postData.title !== payload.postTitle) {
      throw new Error("Post title mismatch.");
    }

    const ref = collection(db, 'comments');
    const newDocRef = doc(ref);
    const fullPayload = {
      post: payload.post,
      postTitle: payload.postTitle,
      userId: payload.userId,
      name: payload.name,
      text: payload.text,
      isHidden: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(newDocRef, fullPayload);
    return {
      _id: newDocRef.id,
      id: newDocRef.id,
      ...fullPayload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  // Submit a reply to a comment (parentId = top-level comment id)
  async submitReply(payload: {
    post: string;
    postTitle: string;
    userId: string;
    name: string;
    text: string;
    parentId: string;
  }) {
    const postRef = doc(db, 'posts', payload.post);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) throw new Error('Target blog post does not exist.');
    const postData = postSnap.data();
    if (postData.status !== 'Published') throw new Error('Target blog post is not published.');
    if (postData.title !== payload.postTitle) throw new Error('Post title mismatch.');

    const ref = collection(db, 'comments');
    const newDocRef = doc(ref);
    const fullPayload = {
      post: payload.post,
      postTitle: payload.postTitle,
      userId: payload.userId,
      name: payload.name,
      text: payload.text,
      parentId: payload.parentId,
      isHidden: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(newDocRef, fullPayload);
    return {
      _id: newDocRef.id,
      id: newDocRef.id,
      ...fullPayload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  },

  // Get replies for a top-level comment
  async getRepliesByComment(postId: string, parentId: string) {
    const ref = collection(db, 'comments');
    const q = query(ref, where('post', '==', postId), where('parentId', '==', parentId), where('isHidden', '==', false));
    const snap = await getDocs(q);
    const list = snap.docs.map(d => {
      const data = d.data() as any;
      const createdAtDate = data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now());
      return {
        _id: d.id,
        id: d.id,
        ...data,
        createdAtDate,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt,
      };
    });
    list.sort((a, b) => a.createdAtDate.getTime() - b.createdAtDate.getTime());
    return list;
  },

  // Owner/Admin Delete
  async deleteComment(id: string) {
    const docRef = doc(db, 'comments', id);
    return deleteDoc(docRef);
  },

  // Like operations
  async likeComment(commentId: string, uid: string) {
    const likeRef = doc(db, `comments/${commentId}/likes`, uid);
    return setDoc(likeRef, {
      createdAt: serverTimestamp()
    });
  },

  async unlikeComment(commentId: string, uid: string) {
    const likeRef = doc(db, `comments/${commentId}/likes`, uid);
    return deleteDoc(likeRef);
  },

  async getLikesCount(commentId: string): Promise<number> {
    const likesRef = collection(db, `comments/${commentId}/likes`);
    const snap = await getCountFromServer(likesRef);
    return snap.data().count;
  },

  async hasUserLiked(commentId: string, uid: string): Promise<boolean> {
    const likeRef = doc(db, `comments/${commentId}/likes`, uid);
    const snap = await getDoc(likeRef);
    return snap.exists();
  },

  // Admin moderation
  async getCommentsAdmin() {
    const ref = collection(db, 'comments');
    const q = query(ref, orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);

    // Fetch reports
    const reportsMap: Record<string, any[]> = {};
    try {
      const reportsRef = collection(db, 'reports');
      const reportsSnap = await getDocs(reportsRef);
      reportsSnap.docs.forEach(docSnap => {
        const rData = docSnap.data();
        const cid = rData.commentId;
        if (cid) {
          if (!reportsMap[cid]) {
            reportsMap[cid] = [];
          }
          reportsMap[cid].push({
            reason: rData.reason || 'Flagged comment',
            user: { name: rData.reporterName || 'Reporter' }
          });
        }
      });
    } catch (e) {
      console.error("Error loading comment reports: ", e);
    }

    const commentsList = await Promise.all(snap.docs.map(async d => {
      const data = d.data() as any;
      const cid = d.id;
      const commentReports = reportsMap[cid] || [];
      
      // Fetch likes count
      let likesCount = 0;
      try {
        const likesRef = collection(db, `comments/${cid}/likes`);
        const likesSnap = await getCountFromServer(likesRef);
        likesCount = likesSnap.data().count;
      } catch (err) {
        console.error("Error getting likes count: ", err);
      }

      return {
        _id: cid,
        id: cid,
        ...data,
        post: typeof data.post === 'string' ? { id: data.post, title: data.postTitle || 'Unknown Post' } : data.post,
        isReported: commentReports.length > 0,
        reportsCount: commentReports.length,
        reports: commentReports,
        likesCount,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt
      };
    }));

    return commentsList;
  },

  async toggleHideComment(id: string, isHidden: boolean) {
    const docRef = doc(db, 'comments', id);
    return updateDoc(docRef, {
      isHidden,
      updatedAt: serverTimestamp()
    });
  }
};
