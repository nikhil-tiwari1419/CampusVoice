// import mongoose from 'mongoose';
// import Program from '../model/Program.model.js';
// import Branch from '../model/Branch.model.js';
// import Batch from '../model/Batch.model.js';

// export async function seed() {
//     // 1. Create Programs
//     const bca = await Program.create({ name: 'BCA', numYears: 4, hasBranches: false });
//     const bsc = await Program.create({ name: 'BSC', numYears: 3, hasBranches: true });

//     // 2. Create BCA batches (no branch, years 1-4)
//     for (let year = 1; year <= bca.numYears; year++) {
//         await Batch.create({ program: bca._id, branch: null, year });
//     }

//     // 3. Create BSc Branches
//     const branchNames = ['Data Science', 'Artificial Intelligence', 'Cybersecurity', 'Physics', 'Chemistry'];
//     const branches = await Branch.insertMany(
//         branchNames.map(name => ({ name, program: bsc._id }))
//     );

//     // 4. Create BSc batches for each branch (years 1-3)
//     for (const branch of branches) {
//         for (let year = 1; year <= bsc.numYears; year++) {
//             await Batch.create({ program: bsc._id, branch: branch._id, year });
//         }
//     }

//     console.log('Seeding done ✅');
// }

