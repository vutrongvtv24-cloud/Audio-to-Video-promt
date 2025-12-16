export const APP_TITLE = "AI Video Director & Prompt Engineer";
export const MAX_FILE_SIZE_MB = 10;
export const SUPPORTED_AUDIO_TYPES = ["audio/mp3", "audio/mpeg", "audio/wav", "audio/aac", "audio/ogg", "audio/m4a"];

export const TEXTS = {
  en: {
    appTitle: "AI Video Director & Prompt Engineer",
    role: "PROMPT ENGINEER AGENT",
    newProject: "New Project",
    heroTitlePrefix: "Turn Audio into",
    heroTitleSuffix: "Cinematic Stories",
    heroDesc: "Upload a voiceover, podcast clip, or story narration. The AI Director will analyze the context, establish a consistent visual style, and generate precise video generation prompts for you.",
    chooseStyle: "Choose Visual Style",
    dropHere: "Drop the audio here",
    uploadClick: "Click to upload or drag and drop",
    uploadLimit: (max: number) => `MP3, WAV, AAC, M4A (Max ${max}MB)`,
    analyzing: "Analyzing & Segmenting",
    analyzingDesc: "The AI Director is listening to your audio, slicing it into precise 8-second segments, and composing visual prompts for each clip...",
    step1: "Listening",
    step2: "Segmenting (8s)",
    step3: "Directing",
    analysisFailed: "Analysis Failed",
    tryAgain: "Try Again",
    resultTitle: "Director's Script",
    exportTxt: "Export TXT",
    downloadMd: "Download MD",
    copy: "Copy All",
    copied: "Copied!",
    footerPowered: "Powered by Gemini 2.5 Flash • Optimized for Video Generation Models",
    author: "Author",
    zalo: "Zalo"
  },
  vi: {
    appTitle: "Đạo diễn Video AI & Kỹ sư Prompt",
    role: "TRỢ LÝ KỸ SƯ PROMPT",
    newProject: "Dự án mới",
    heroTitlePrefix: "Biến âm thanh thành",
    heroTitleSuffix: "Câu chuyện Điện ảnh",
    heroDesc: "Tải lên giọng đọc, podcast hoặc câu chuyện. Đạo diễn AI sẽ phân tích ngữ cảnh, thiết lập phong cách hình ảnh nhất quán và tạo ra các prompt tạo video chính xác cho bạn.",
    chooseStyle: "Chọn Phong cách Hình ảnh",
    dropHere: "Thả file âm thanh vào đây",
    uploadClick: "Nhấn để tải lên hoặc kéo thả",
    uploadLimit: (max: number) => `MP3, WAV, AAC, M4A (Tối đa ${max}MB)`,
    analyzing: "Đang phân tích & Chia đoạn",
    analyzingDesc: "Đạo diễn AI đang nghe âm thanh, chia nhỏ thành các đoạn 8 giây chuẩn xác và viết kịch bản hình ảnh cho từng đoạn...",
    step1: "Đang nghe",
    step2: "Chia đoạn (8s)",
    step3: "Đạo diễn",
    analysisFailed: "Phân tích thất bại",
    tryAgain: "Thử lại",
    resultTitle: "Kịch bản Đạo diễn",
    exportTxt: "Xuất TXT",
    downloadMd: "Tải xuống MD",
    copy: "Sao chép",
    copied: "Đã chép!",
    footerPowered: "Được hỗ trợ bởi Gemini 2.5 Flash • Tối ưu hóa cho các mô hình tạo video",
    author: "Tác giả",
    zalo: "Zalo"
  }
};

export const VIDEO_STYLES = [
  { 
    id: 'cinematic', 
    name: 'Cinematic Movie',
    name_vi: 'Điện ảnh Hollywood',
    description: 'High budget, dramatic lighting, 8k, anamorphic lens',
    description_vi: 'Ngân sách cao, ánh sáng kịch tính, quay bằng lens Anamorphic',
    prompt_modifier: 'Cinematic lighting, photorealistic, 8k, shot on ARRI Alexa, color graded, dramatic atmosphere',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'photorealistic', 
    name: 'Photorealistic / Doc',
    name_vi: 'Tài liệu thực tế',
    description: 'Natural lighting, sharp focus, true-to-life details',
    description_vi: 'Ánh sáng tự nhiên, sắc nét, chi tiết chân thực như phim tài liệu',
    prompt_modifier: 'Hyper-realistic, documentary style, natural lighting, 4k, high texture detail, sharp focus',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: '3d-animation', 
    name: '3D Animation', 
    name_vi: 'Hoạt hình 3D',
    description: 'Pixar/Disney style, Unreal Engine 5 render',
    description_vi: 'Phong cách Pixar/Disney, kết xuất Unreal Engine 5 rực rỡ',
    prompt_modifier: '3D Animation style, Pixar style, Unreal Engine 5 render, vibrant colors, soft lighting, cute and expressive',
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'anime', 
    name: 'Anime / Japanese 2D', 
    name_vi: 'Anime Nhật Bản',
    description: 'Hand-drawn feel, vibrant, Makoto Shinkai style',
    description_vi: 'Nét vẽ tay 2D, màu sắc rực rỡ, phong cách Makoto Shinkai',
    prompt_modifier: 'Anime style, Makoto Shinkai art style, vibrant colors, detailed background art, high quality 2D animation',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    name_vi: 'Cyberpunk Viễn tưởng',
    description: 'Neon lights, dark atmosphere, high tech, sci-fi',
    description_vi: 'Đèn neon, không khí tối tăm, công nghệ cao, Sci-fi',
    prompt_modifier: 'Cyberpunk style, neon lighting, futuristic city, rain-slicked streets, high tech, dark atmosphere, blade runner vibe',
    image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'vintage', 
    name: 'Vintage Film (16mm)', 
    name_vi: 'Phim nhựa cổ điển',
    description: 'Film grain, retro colors, nostalgic feel',
    description_vi: 'Hạt nhiễu film, màu hoài cổ, cảm giác cũ kỹ những năm 90',
    prompt_modifier: 'Vintage 16mm film look, film grain, retro color palette, nostalgic atmosphere, light leaks, old movie style',
    image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'claymation', 
    name: 'Claymation', 
    name_vi: 'Hoạt hình đất sét',
    description: 'Textured, handmade feel, Aardman style',
    description_vi: 'Chất liệu đất sét, thủ công, phong cách Aardman',
    prompt_modifier: 'Claymation style, stop motion animation, plasticine texture, handmade look, studio lighting',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'fantasy', 
    name: 'Fantasy Art', 
    name_vi: 'Thần thoại huyền ảo',
    description: 'Ethereal, magical, oil painting style',
    description_vi: 'Huyền bí, phép thuật, phong cách tranh sơn dầu kỹ thuật số',
    prompt_modifier: 'Fantasy digital art, ethereal atmosphere, magical lighting, concept art style, highly detailed, dreamlike',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'watercolor', 
    name: 'Watercolor', 
    name_vi: 'Tranh màu nước',
    description: 'Soft edges, artistic, flowing colors',
    description_vi: 'Nét vẽ mềm, nghệ thuật, màu sắc lan tỏa',
    prompt_modifier: 'Watercolor painting style, soft edges, flowing colors, artistic, pastel palette, textured paper background',
    image: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'pixel-art', 
    name: 'Pixel Art', 
    name_vi: 'Nghệ thuật Pixel',
    description: '8-bit, retro game style, blocky',
    description_vi: '8-bit, phong cách game cổ điển, hình khối',
    prompt_modifier: 'Pixel art style, 16-bit, retro game aesthetic, blocky, vibrant colors, dithering, arcade style',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'noir', 
    name: 'Film Noir', 
    name_vi: 'Phim Noir Đen Trắng',
    description: 'Black & white, high contrast, mysterious',
    description_vi: 'Đen trắng, tương phản cao, bí ẩn, kịch tính',
    prompt_modifier: 'Film noir style, black and white, high contrast, dramatic shadows, silhouetted figures, moody atmosphere, 1940s detective style',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop'
  },
  { 
    id: 'low-poly', 
    name: 'Low Poly 3D', 
    name_vi: '3D Đa giác thấp',
    description: 'Geometric, minimalistic, clean',
    description_vi: 'Hình khối, tối giản, sạch sẽ, hiện đại',
    prompt_modifier: 'Low poly style, isometric view, sharp edges, geometric shapes, soft lighting, minimalism, clean render',
    image: 'https://images.unsplash.com/photo-1487887235947-a955ef187fcc?q=80&w=600&auto=format&fit=crop'
  }
];

export const getSystemInstruction = (styleModifier: string, language: 'en' | 'vi') => {
  const isVietnamese = language === 'vi';
  
  return `
Bạn là một Chuyên gia Đạo diễn Video AI và Kỹ sư Prompt (AI Video Director & Prompt Engineer). Nhiệm vụ của bạn là nghe file audio đầu vào, phân tích nội dung và tạo ra các kịch bản hình ảnh (prompts) chi tiết để sinh video minh họa.

Operational Rules (Quy tắc vận hành):
1. Phân tích Audio & Chia đoạn (Segmentation):
- Lắng nghe toàn bộ file audio.
- **YÊU CẦU QUAN TRỌNG:** Chia toàn bộ audio thành các đoạn CỐ ĐỊNH theo thời gian, mỗi đoạn dài ĐÚNG 8 GIÂY (00:00-00:08, 00:08-00:16, 00:16-00:24...).
- Mỗi đoạn 8 giây này sẽ tương ứng duy nhất với 1 Prompt (để tạo 1 video clip dài 8s).

2. Thiết lập tính nhất quán tuyệt đối (Consistency Lock):
- **User Selected Style:** Video này PHẢI tuân theo phong cách: "${styleModifier}".
- Trước tiên, định nghĩa một "Master Description": Mô tả cực kỳ chi tiết về ngoại hình nhân vật (tóc, màu da, quần áo cố định), bối cảnh chính dựa trên phong cách đã chọn ở trên.
- **YÊU CẦU BẮT BUỘC:** Trong danh sách prompt, MỖI PROMPT đều PHẢI BẮT ĐẦU bằng toàn bộ nội dung của "Master Description". Điều này giúp nhân vật không bị biến đổi giữa các cảnh.

3. Cấu trúc Output cho mỗi Prompt (Mỗi 8s):
[Master Description] + [Hành động/Sự kiện diễn ra trong 8s này] + [Camera Movement: Pan/Zoom/Tracking] --ar 16:9

Output Format (Định dạng trả về):
${isVietnamese ? 
  'Trình bày phân tích bằng TIẾNG VIỆT, nhưng nội dung Prompt phải viết bằng TIẾNG ANH.' : 
  'Present the analysis and prompts entirely in English.'
}

Hãy trình bày kết quả theo định dạng Markdown như sau:

# ${isVietnamese ? 'PHÂN TÍCH TỔNG QUAN' : 'OVERVIEW ANALYSIS'}
**${isVietnamese ? 'Chủ đề' : 'Topic'}:** ...
**Selected Visual Style:** ${styleModifier}
**Master Visual Style Description:** [Mô tả gốc dùng để lặp lại - Rất quan trọng]
**Total Estimated Videos:** [Tính tổng số video dựa trên độ dài audio chia cho 8s]

# ${isVietnamese ? 'DANH SÁCH KỊCH BẢN CHI TIẾT (MỖI ĐOẠN 8s)' : 'DETAILED SCRIPT (8-SECOND SEGMENTS)'}

## ⏰ Segment 1: [00:00 - 00:08]
**${isVietnamese ? 'Nội dung âm thanh' : 'Audio Context'}:** [Tóm tắt lời thoại/âm thanh đoạn này]
- **Prompt #1:** [Master Description] + [Action] + [Camera] --ar 16:9

## ⏰ Segment 2: [00:08 - 00:16]
**${isVietnamese ? 'Nội dung âm thanh' : 'Audio Context'}:** ...
- **Prompt #2:** [Master Description] + [Action] + [Camera] --ar 16:9

... (Tiếp tục đánh số Prompt tăng dần #3, #4... cho đến hết thời lượng audio)
`;
};