// SRMIST Kattankulathur Campus Road & Walkway Navigation Engine

export const ROAD_NODES = {
  // South Gate & GST Avenue Corridor
  'N_ARCH_GATE': { id: 'N_ARCH_GATE', x: 170, y: 350, name: 'Main Arch Gate Checkpoint' },
  'N_SEC_HQ': { id: 'N_SEC_HQ', x: 190, y: 365, name: 'Main Security Control Post' },
  'N_WEST_AVE_1': { id: 'N_WEST_AVE_1', x: 195, y: 430, name: 'West Avenue / VEC South Junction' },
  'N_WEST_AVE_2': { id: 'N_WEST_AVE_2', x: 210, y: 500, name: 'West Avenue / Architecture Lane' },
  'N_VEC_APPROACH': { id: 'N_VEC_APPROACH', x: 180, y: 560, name: 'VEC Campus West Drive' },
  'N_PHARMACY_APPROACH': { id: 'N_PHARMACY_APPROACH', x: 180, y: 280, name: 'Pharmacy Block Entrance' },

  // South-East Lake & Dental Corridor
  'N_GST_EAST': { id: 'N_GST_EAST', x: 280, y: 290, name: 'GST Service Road East' },
  'N_LAKE_MID': { id: 'N_LAKE_MID', x: 380, y: 270, name: 'Thangel Lake Promenade' },
  'N_POTHERI_WALK': { id: 'N_POTHERI_WALK', x: 410, y: 110, name: 'Potheri Footbridge Link' },
  'N_DENTAL_ROAD_1': { id: 'N_DENTAL_ROAD_1', x: 460, y: 240, name: 'Dental Campus Avenue North' },
  'N_DENTAL_ROAD_2': { id: 'N_DENTAL_ROAD_2', x: 550, y: 200, name: 'Dental College & Hospital Gate' },

  // Central Engineering & Academic Core
  'N_LIB_SOUTH': { id: 'N_LIB_SOUTH', x: 270, y: 530, name: 'Central Library South Walkway' },
  'N_LIB_WEST': { id: 'N_LIB_WEST', x: 270, y: 600, name: 'Central Library West Road' },
  'N_BELL_ACCESS': { id: 'N_BELL_ACCESS', x: 310, y: 515, name: 'BELL Block Front Entrance' },
  'N_ENGG_MECH': { id: 'N_ENGG_MECH', x: 320, y: 460, name: 'Mechanical & Civil Labs Way' },
  'N_JAVA_COURT': { id: 'N_JAVA_COURT', x: 375, y: 465, name: 'Java Green Food Court Boulevard' },
  'N_UNIV_SOUTH': { id: 'N_UNIV_SOUTH', x: 370, y: 510, name: 'University Central Quad (Assembly Point B)' },
  'N_UNIV_EAST': { id: 'N_UNIV_EAST', x: 390, y: 550, name: 'University Administrative East Drive' },
  'N_TECHPARK_WEST': { id: 'N_TECHPARK_WEST', x: 430, y: 535, name: 'Tech Park Entrance Plaza' },
  'N_TECHPARK_EAST': { id: 'N_TECHPARK_EAST', x: 460, y: 520, name: 'Tech Park East Walkway' },

  // Hostels Corridor
  'N_HOSTEL_BOYS_JUNC': { id: 'N_HOSTEL_BOYS_JUNC', x: 480, y: 520, name: 'Hostel Boulevard South' },
  'N_HOSTEL_BOYS': { id: 'N_HOSTEL_BOYS', x: 510, y: 540, name: 'Kaari & Paari Hostels Gate' },
  'N_HOSTEL_GIRLS_JUNC': { id: 'N_HOSTEL_GIRLS_JUNC', x: 480, y: 590, name: 'Hostel Boulevard North' },
  'N_HOSTEL_GIRLS': { id: 'N_HOSTEL_GIRLS', x: 530, y: 600, name: 'Senbagam & Meenakshi Hostels Gate' },

  // North-South Campus Spine (Sports Grounds, Lagoon, Gardens)
  'N_SPINE_MID': { id: 'N_SPINE_MID', x: 380, y: 620, name: 'Campus Spine / Sports Ground South' },
  'N_SPORTS_WEST': { id: 'N_SPORTS_WEST', x: 320, y: 680, name: 'Main Sports Ground (Assembly Point A)' },
  'N_SPINE_NORTH': { id: 'N_SPINE_NORTH', x: 380, y: 690, name: 'Campus Spine / Lagoon Entrance' },
  'N_LAGOON_ROAD': { id: 'N_LAGOON_ROAD', x: 430, y: 680, name: 'Lagoon East Walkway' },
  'N_LAGOON_NORTH': { id: 'N_LAGOON_NORTH', x: 430, y: 750, name: 'Garden Pathway North' },
  'N_MED_CONNECTOR': { id: 'N_MED_CONNECTOR', x: 380, y: 760, name: 'Medical Campus South Boulevard' },

  // Medical Campus & Hospital Hub (North)
  'N_HOSPITAL_SOUTH': { id: 'N_HOSPITAL_SOUTH', x: 385, y: 800, name: 'SRM Hospital Trauma Casualty Entrance' },
  'N_HOSPITAL_WEST': { id: 'N_HOSPITAL_WEST', x: 320, y: 820, name: 'Medical College West Avenue' },
  'N_HOSPITAL_NORTH': { id: 'N_HOSPITAL_NORTH', x: 385, y: 870, name: 'Hospital North Quad (Assembly Point C)' },
  'N_HOSPITAL_EAST': { id: 'N_HOSPITAL_EAST', x: 450, y: 820, name: 'Medical Research Wing East' },
  'N_FIRE_POST': { id: 'N_FIRE_POST', x: 215, y: 824, name: 'Campus Fire Safety Station Road' }
};

// Actual bidirectional roads and walkways
export const ROAD_EDGES = [
  // South gate & arterial access
  ['N_ARCH_GATE', 'N_SEC_HQ'],
  ['N_SEC_HQ', 'N_WEST_AVE_1'],
  ['N_WEST_AVE_1', 'N_WEST_AVE_2'],
  ['N_WEST_AVE_2', 'N_VEC_APPROACH'],
  ['N_SEC_HQ', 'N_PHARMACY_APPROACH'],
  ['N_SEC_HQ', 'N_GST_EAST'],
  ['N_GST_EAST', 'N_LAKE_MID'],
  ['N_LAKE_MID', 'N_POTHERI_WALK'],
  ['N_LAKE_MID', 'N_DENTAL_ROAD_1'],
  ['N_DENTAL_ROAD_1', 'N_DENTAL_ROAD_2'],
  ['N_GST_EAST', 'N_ENGG_MECH'],

  // Central Engineering & Academic Core
  ['N_WEST_AVE_2', 'N_LIB_SOUTH'],
  ['N_LIB_SOUTH', 'N_LIB_WEST'],
  ['N_LIB_SOUTH', 'N_BELL_ACCESS'],
  ['N_BELL_ACCESS', 'N_ENGG_MECH'],
  ['N_ENGG_MECH', 'N_JAVA_COURT'],
  ['N_JAVA_COURT', 'N_UNIV_SOUTH'],
  ['N_BELL_ACCESS', 'N_UNIV_SOUTH'],
  ['N_UNIV_SOUTH', 'N_UNIV_EAST'],
  ['N_UNIV_EAST', 'N_TECHPARK_WEST'],
  ['N_TECHPARK_WEST', 'N_TECHPARK_EAST'],
  ['N_JAVA_COURT', 'N_TECHPARK_EAST'],

  // Hostels
  ['N_TECHPARK_EAST', 'N_HOSTEL_BOYS_JUNC'],
  ['N_HOSTEL_BOYS_JUNC', 'N_HOSTEL_BOYS'],
  ['N_HOSTEL_BOYS_JUNC', 'N_HOSTEL_GIRLS_JUNC'],
  ['N_HOSTEL_GIRLS_JUNC', 'N_HOSTEL_GIRLS'],

  // North-South Spine
  ['N_LIB_WEST', 'N_SPORTS_WEST'],
  ['N_UNIV_EAST', 'N_SPINE_MID'],
  ['N_SPINE_MID', 'N_HOSTEL_GIRLS_JUNC'],
  ['N_SPINE_MID', 'N_SPINE_NORTH'],
  ['N_SPINE_NORTH', 'N_SPORTS_WEST'],
  ['N_SPINE_NORTH', 'N_LAGOON_ROAD'],
  ['N_LAGOON_ROAD', 'N_LAGOON_NORTH'],
  ['N_SPINE_NORTH', 'N_MED_CONNECTOR'],
  ['N_LAGOON_NORTH', 'N_MED_CONNECTOR'],

  // Medical Campus Loop
  ['N_MED_CONNECTOR', 'N_HOSPITAL_SOUTH'],
  ['N_HOSPITAL_SOUTH', 'N_HOSPITAL_WEST'],
  ['N_HOSPITAL_WEST', 'N_HOSPITAL_NORTH'],
  ['N_HOSPITAL_NORTH', 'N_HOSPITAL_EAST'],
  ['N_HOSPITAL_EAST', 'N_HOSPITAL_SOUTH'],
  ['N_HOSPITAL_WEST', 'N_FIRE_POST'],
  ['N_SPORTS_WEST', 'N_FIRE_POST']
];

// Pre-build adjacency graph
const ADJACENCY = {};
Object.keys(ROAD_NODES).forEach(id => {
  ADJACENCY[id] = [];
});

ROAD_EDGES.forEach(([u, v]) => {
  const nodeU = ROAD_NODES[u];
  const nodeV = ROAD_NODES[v];
  if (!nodeU || !nodeV) return;
  const dist = Math.hypot(nodeV.x - nodeU.x, nodeV.y - nodeU.y);
  ADJACENCY[u].push({ id: v, dist, name: nodeV.name });
  ADJACENCY[v].push({ id: u, dist, name: nodeU.name });
});

// Euclidean distance
export function distanceBetween(p1, p2) {
  if (!p1 || !p2) return Infinity;
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

// Find closest road node to a coordinate
export function findClosestRoadNode(pos) {
  let closest = null;
  let minDist = Infinity;
  Object.values(ROAD_NODES).forEach(node => {
    const d = distanceBetween(pos, node);
    if (d < minDist) {
      minDist = d;
      closest = node;
    }
  });
  return closest;
}

// Dijkstra Shortest Path along road graph
export function dijkstraRoadPath(startNodeId, endNodeId) {
  const dist = {};
  const prev = {};
  const unvisited = new Set(Object.keys(ROAD_NODES));

  Object.keys(ROAD_NODES).forEach(id => {
    dist[id] = Infinity;
    prev[id] = null;
  });

  dist[startNodeId] = 0;

  while (unvisited.size > 0) {
    let curr = null;
    let minD = Infinity;
    unvisited.forEach(id => {
      if (dist[id] < minD) {
        minD = dist[id];
        curr = id;
      }
    });

    if (curr === null || dist[curr] === Infinity) break;
    if (curr === endNodeId) break;

    unvisited.delete(curr);

    (ADJACENCY[curr] || []).forEach(neighbor => {
      if (!unvisited.has(neighbor.id)) return;
      const alt = dist[curr] + neighbor.dist;
      if (alt < dist[neighbor.id]) {
        dist[neighbor.id] = alt;
        prev[neighbor.id] = curr;
      }
    });
  }

  const path = [];
  let u = endNodeId;
  while (u) {
    path.unshift(ROAD_NODES[u]);
    u = prev[u];
  }

  // If unreachable
  if (path.length > 0 && path[0].id !== startNodeId) {
    return { path: [ROAD_NODES[startNodeId], ROAD_NODES[endNodeId]], pixelDist: distanceBetween(ROAD_NODES[startNodeId], ROAD_NODES[endNodeId]) };
  }

  return { path, pixelDist: dist[endNodeId] };
}

// Generate Turn-by-Turn Directions
export function generateTurnDirections(points, destName) {
  if (!points || points.length < 2) return [];

  const steps = [];

  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const distPx = distanceBetween(curr, next);
    const distMeters = Math.max(15, Math.round(distPx * 1.8));

    if (i === 0) {
      steps.push({
        instruction: `Head towards ${next.name || 'Campus Walkway'}`,
        subtext: 'Walk along illuminated campus lane',
        action: 'depart',
        distanceMeters: distMeters,
        latlng: [curr.y, curr.x]
      });
    } else if (i === points.length - 2) {
      steps.push({
        instruction: `Arrive at ${destName || 'destination'}`,
        subtext: 'Destination is directly ahead',
        action: 'arrive',
        distanceMeters: distMeters,
        latlng: [next.y, next.x]
      });
    } else {
      const prev = points[i - 1];
      // Angle calculation
      const angle1 = Math.atan2(curr.y - prev.y, curr.x - prev.x);
      const angle2 = Math.atan2(next.y - curr.y, next.x - curr.x);
      let diff = (angle2 - angle1) * (180 / Math.PI);
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;

      let turnType = 'straight';
      let turnAction = 'Continue straight onto';

      if (diff > 35 && diff < 140) {
        turnType = 'turn-left';
        turnAction = 'Turn left onto';
      } else if (diff < -35 && diff > -140) {
        turnType = 'turn-right';
        turnAction = 'Turn right onto';
      } else if (diff >= 140 || diff <= -140) {
        turnType = 'uturn';
        turnAction = 'Make sharp turn towards';
      }

      steps.push({
        instruction: `${turnAction} ${next.name || 'main road'}`,
        subtext: `Follow walkway for ~${distMeters} m`,
        action: turnType,
        distanceMeters: distMeters,
        latlng: [curr.y, curr.x]
      });
    }
  }

  return steps;
}

// Master Route Planner
export function calculateCampusRoute(startPos, destPos, destName = 'Destination') {
  if (!startPos || !destPos || destPos.x == null || destPos.y == null) {
    return null;
  }

  // 1. Snap start and dest to road network
  const startRoadNode = findClosestRoadNode(startPos);
  const destRoadNode = findClosestRoadNode(destPos);

  if (!startRoadNode || !destRoadNode) {
    // Fallback: direct line
    const px = distanceBetween(startPos, destPos);
    const m = Math.round(px * 1.8);
    return {
      coordinates: [[startPos.y, startPos.x], [destPos.y, destPos.x]],
      distanceMeters: m,
      durationMinutes: Math.max(1, Math.round(m / 75)),
      steps: [
        { instruction: `Head directly towards ${destName}`, action: 'depart', distanceMeters: m, latlng: [startPos.y, startPos.x] },
        { instruction: `Arrive at ${destName}`, action: 'arrive', distanceMeters: 0, latlng: [destPos.y, destPos.x] }
      ]
    };
  }

  // 2. Find shortest path on road network
  const { path: roadPath, pixelDist } = dijkstraRoadPath(startRoadNode.id, destRoadNode.id);

  // 3. Assemble full sequence of nodes
  const fullNodes = [
    { x: startPos.x, y: startPos.y, name: 'Current Location' },
    ...roadPath,
    { x: destPos.x, y: destPos.y, name: destName }
  ];

  // Remove duplicate consecutive nodes if snapped node is identical
  const cleanedNodes = [];
  fullNodes.forEach(node => {
    if (cleanedNodes.length === 0) {
      cleanedNodes.push(node);
    } else {
      const prev = cleanedNodes[cleanedNodes.length - 1];
      if (Math.hypot(node.x - prev.x, node.y - prev.y) > 5) {
        cleanedNodes.push(node);
      }
    }
  });

  // 4. Calculate total distance
  let totalPx = 0;
  for (let i = 0; i < cleanedNodes.length - 1; i++) {
    totalPx += distanceBetween(cleanedNodes[i], cleanedNodes[i + 1]);
  }
  const distanceMeters = Math.max(20, Math.round(totalPx * 1.8));
  const durationMinutes = Math.max(1, Math.round(distanceMeters / 75));

  // 5. Build turn-by-turn instructions
  const steps = generateTurnDirections(cleanedNodes, destName);

  // 6. Convert to Leaflet coordinates [y, x]
  const coordinates = cleanedNodes.map(n => [n.y, n.x]);

  return {
    coordinates,
    distanceMeters,
    durationMinutes,
    steps,
    destination: destPos,
    destinationName: destName
  };
}

// Proximity / Nearby Emergency Facilities
export function getNearbyEmergencyFacilities(userPos, allLocations) {
  if (!userPos) return [];

  const emergencyCats = ['medical', 'security', 'emergency'];

  return allLocations
    .filter(loc => emergencyCats.includes(loc.category) && loc.verified && loc.x != null && loc.y != null)
    .map(loc => {
      const route = calculateCampusRoute(userPos, loc, loc.name);
      return {
        ...loc,
        route,
        distanceMeters: route ? route.distanceMeters : Math.round(distanceBetween(userPos, loc) * 1.8),
        durationMinutes: route ? route.durationMinutes : Math.max(1, Math.round((distanceBetween(userPos, loc) * 1.8) / 75))
      };
    })
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}
