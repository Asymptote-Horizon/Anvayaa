import sqlite3

db='c:/Users/Omkar/Desktop/anvaya-26 mar 26 v1/backend/anvaya_dev.db'
updates={
 'course-physics-101':'https://www.youtube.com/embed/wHC245cVdHw?si=J3DQETYohI8F8BjO',
 'course-chemistry-101':'https://www.youtube.com/embed/bka20Q9TN6M?si=JJZSMo-dlVpxhfGj',
 'course-math-101':'https://www.youtube.com/embed/LwCRRUa8yTU?si=E9IumYEord-spWR',
 'course-english-101':'https://www.youtube.com/embed/Awc1h20Ja94?si=H6Pk8W_l0sVIXfHA',
 'course-cs-101':'https://www.youtube.com/embed/CNFK86hJRfE?si=2OxYXGO-JJdxsFnH',
 'course-life-101':'https://www.youtube.com/embed/jrK-dolcjvw?si=ObUf9naEzc3Fjnrc'
}
conn=sqlite3.connect(db)
c=conn.cursor()
count=0
for cid,url in updates.items():
    c.execute('UPDATE courses SET video_url=? WHERE id=?',(url,cid))
    count += c.rowcount
conn.commit()
print('Updated rows:', count)
conn.close()
